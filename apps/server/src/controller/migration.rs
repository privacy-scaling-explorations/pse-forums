use std::{collections::HashMap, path::PathBuf};

use bincode::{Decode, Encode};
use serde::Serialize;
use sled::{Batch, Db};
use tracing::info;

use crate::{
    controller::{
        db_utils::{get_batch, get_count, incr_id, u32_to_ivec},
        inn::inn_add_index,
        meta_handler::ParamsPage,
        Inn, Post, User,
    },
    get_one, ivec_to_u32, set_one, AppError,
};

const MIGRATION_TREE: &str = "migration";
const MIGRATION_ID: u32 = 0;

#[derive(Default, Encode, Decode, Serialize, Debug)]
struct Migration {
    complete: bool,
}

/// Migrates data from another Freedit instance to this one.
/// Note that this migration is not atomic.
///
/// Includes:
/// - Default Inn
/// - Users
/// - Posts
/// - Solos (TODO May not need)
/// - Comments
///
pub fn migrate_data_from_freedit(db: &Db, migration_db: PathBuf) -> Result<bool, AppError> {
    info!("moving data from {0} to default db", migration_db.display());

    let config = sled::Config::default().path(migration_db);
    let m_db = config.open()?;

    // Check to see if we've already brought in incoming db
    let existing_migration: Result<Migration, AppError> =
        get_one(&m_db, MIGRATION_TREE, MIGRATION_ID);
    if existing_migration.is_ok() {
        info!("migration already completed");
        return Ok(true);
    }

    // Migrate Inn (Use existing)
    let num_incoming_inns = get_count(&m_db, "default", "inns_count")?;
    info!("processing {0} incoming Inns", num_incoming_inns);

    let num_current_inns = get_count(&db, "default", "inns_count")?;
    info!("{0} current Inns found", num_current_inns);

    if num_incoming_inns != 1 || num_current_inns != 1 {
        return Err(AppError::Custom(
            "more than 1 incoming or current inn(s) found".to_string(),
        ));
    }
    let iid = 0; // TODO Check this is correct defaul inn id
    let iid_ivec = u32_to_ivec(iid);
    let inn: Inn = get_one(db, "inns", iid)?;

    // Migrate User
    let num_incoming_users = get_count(&m_db, "default", "users_count")?;
    info!("processing {0} incoming Users", num_incoming_users);

    let page_params = ParamsPage {
        anchor: 0,
        n: num_incoming_users,
        is_desc: false,
    };
    let incoming_users: Vec<User> =
        get_batch(&m_db, "default", "users_count", "users", &page_params)?;
    let username_tree = db.open_tree("usernames")?;
    // Incoming -> existing
    let mut user_remapping: HashMap<u32, u32> = HashMap::new();

    for i_u in incoming_users.iter() {
        if let Some(v) = username_tree.get(i_u.username.clone())? {
            let uid = ivec_to_u32(&v);
            user_remapping.insert(i_u.uid, uid);
            info!(
                "remapped existing User {0} uid {1} to {2}",
                i_u.username, i_u.uid, uid
            );
        } else {
            let uid = incr_id(db, "users_count")?;
            user_remapping.insert(i_u.uid, uid);
            info!(
                "remapped new User {0} uid {1} to {2}",
                i_u.username, i_u.uid, uid
            );

            let new_user = User {
                uid,
                username: i_u.username.clone(),
                password_hash: i_u.password_hash.clone(),
                recovery_hash: i_u.recovery_hash.clone(),
                created_at: i_u.created_at,
                role: i_u.role,
                url: i_u.url.clone(),
                about: i_u.about.clone(),
            };

            set_one(db, "users", uid, &new_user)?;
            username_tree.insert(i_u.username.clone(), u32_to_ivec(uid))?;
        }
    }

    // Migrate Post
    let num_incoming_posts = get_count(&m_db, "default", "posts_count")?;
    info!("processing {0} incoming Posts", num_incoming_posts);

    let page_params = ParamsPage {
        anchor: 0,
        n: num_incoming_posts,
        is_desc: false,
    };
    let incoming_posts: Vec<Post> =
        get_batch(&m_db, "default", "posts_count", "posts", &page_params)?;

    for i_p in incoming_posts.iter() {
        let uid_opt = user_remapping.get(&i_p.uid);
        if uid_opt.is_none() {
            let msg = format!(
                "uid {0} for incoming pid {1} is missing in user remapping",
                i_p.uid, i_p.pid
            );
            return Err(AppError::Custom(msg));
        }
        let uid = uid_opt.unwrap().clone();

        let pid = incr_id(db, "posts_count")?;
        let pid_ivec = u32_to_ivec(pid);

        info!("creating post. pid {0}, incoming pid {1}", pid, i_p.pid);

        let new_post = Post {
            pid: pid,
            uid: uid,
            iid: iid,
            title: i_p.title.clone(),
            tags: i_p.tags.clone(),
            content: i_p.content.clone(),
            created_at: i_p.created_at.clone(),
            status: i_p.status.clone(),
        };

        set_one(db, "posts", i_p.pid, &new_post)?;

        if inn.is_open_access() {
            // Migrate tags
            let mut batch = Batch::default();
            for tag in new_post.tags {
                let k = [tag.as_bytes(), &pid_ivec].concat();
                batch.insert(k, &[]);
            }
            db.open_tree("tags")?.apply_batch(batch)?;

            db.open_tree("tan")?.insert(format!("post{}", pid), &[])?;
        }

        // Update other indicies & stats
        let k = [&iid_ivec, &pid_ivec].concat();
        db.open_tree("inn_posts")?.insert(k, &[])?;

        let k = [&u32_to_ivec(uid), &pid_ivec].concat();
        let mut v = iid.to_be_bytes().to_vec();
        v.push(inn.inn_type);
        db.open_tree("user_posts")?.insert(k, v)?;

        inn_add_index(db, iid, pid, new_post.created_at as u32, inn.inn_type)?;
        User::update_stats(db, uid, "post")?;
    }

    // Migrate Solo
    // This may be unnecessary to implement if there are no solo posts
    let num_incoming_solos = get_count(&m_db, "default", "solos_count")?;
    info!("processing {0} incoming Solos", num_incoming_solos);

    // Migrate Comment
    // Note that these are attached to a post/solo.
    // let num_incoming_users = get_count(&m_db, "post_comments_count", pid)?;
    // info!("processing {0} incoming Comments", num_incoming_users);

    // Insert migration completion.
    // Check to see if we've already brought in incoming db
    let migration = Migration { complete: true };
    set_one(&m_db, MIGRATION_TREE, MIGRATION_ID, &migration)?;

    info!("migration complete");
    Ok(true)
}
