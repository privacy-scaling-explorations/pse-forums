use std::{collections::HashMap, path::PathBuf};

use bincode::{config::standard, Decode, Encode};
use serde::Serialize;
use sled::{transaction::ConflictableTransactionError, Batch, Db, Transactional};
use tracing::info;

use crate::{
    controller::{
        db_utils::{get_batch, get_count, incr_id, set_one_with_key, u32_to_ivec},
        inn::inn_add_index,
        meta_handler::ParamsPage,
        user::InnRole,
        Comment, Inn, Post, User,
    },
    get_one, ivec_to_u32, set_one, AppError,
};

const MIGRATION_TREE: &str = "migration";
const MIGRATION_ID: u32 = 0;

#[derive(Default, Encode, Decode, Serialize, Debug)]
struct Migration {
    complete: bool,
}

// Copied from inn.rs
fn inn_rm_index(db: &Db, iid: u32, pid: u32) -> Result<u8, AppError> {
    let tl_idx_tree = db.open_tree("post_timeline_idx")?;
    let tl_tree = db.open_tree("post_timeline")?;

    (&tl_idx_tree, &tl_tree)
        .transaction(|(tl_idx, tl)| {
            let mut inn_type = 0;

            let k = [&u32_to_ivec(iid), &u32_to_ivec(pid)].concat();
            if let Some(v) = tl_idx.remove(&*k)? {
                let k = [&v[0..4], &u32_to_ivec(iid), &u32_to_ivec(pid)].concat();
                if let Some(v) = tl.remove(k)? {
                    inn_type = v[0];
                }
            }

            Ok::<u8, ConflictableTransactionError<AppError>>(inn_type)
        })
        .map_err(|e| AppError::Custom(format!("transaction error: {e}")))
}

/// Migrates data from another Freedit instance to this one.
/// Note that this migration is not atomic. It also assumes that
/// the destination freedit has at least one inn that
/// posts & comments will be migrated to.
///
/// Includes:
/// - Users
/// - TODO Inn Role?
/// - Posts
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

    //////////////////////////////////
    //  Migrate Inn (Use existing) //
    //////////////////////////////////
    let num_incoming_inns = get_count(&m_db, "default", "inns_count")?;
    info!("processing {0} incoming Inns", num_incoming_inns);

    let num_current_inns = get_count(&db, "default", "inns_count")?;
    info!("{0} current Inns found", num_current_inns);

    if num_incoming_inns != 1 || num_current_inns != 1 {
        return Err(AppError::Custom(
            "more than 1 incoming or current inn(s) found".to_string(),
        ));
    }
    let iid = 1; // First inn
    let iid_ivec = u32_to_ivec(iid);
    let inn: Inn = get_one(db, "inns", iid)?;

    //////////////////
    // Migrate User //
    //////////////////
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

    //////////////////
    // Migrate Post //
    //////////////////
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
        let uid_ivec = u32_to_ivec(uid);

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

        // Update other indices & stats
        let k = [&iid_ivec, &pid_ivec].concat();
        db.open_tree("inn_posts")?.insert(k, &[])?;

        let k = [&u32_to_ivec(uid), &pid_ivec].concat();
        let mut v = iid.to_be_bytes().to_vec();
        v.push(inn.inn_type);
        db.open_tree("user_posts")?.insert(k, v)?;

        inn_add_index(db, iid, pid, new_post.created_at as u32, inn.inn_type)?;
        User::update_stats(db, uid, "post")?;

        //////////////////////////////
        // Migrate Comments on Post //
        //////////////////////////////
        let incoming_pid = i_p.pid;
        let incoming_pid_ivec = u32_to_ivec(incoming_pid);

        let num_incoming_comments = get_count(&m_db, "post_comments_count", &pid_ivec)?;
        info!(
            "processing {0} incoming Comments for pid {1}, incoming pid {2}",
            num_incoming_comments, pid, incoming_pid
        );

        let incoming_post_comments_tree = &m_db.open_tree("post_comments")?;
        let post_comments_count_tree = &db.open_tree("post_comments_count")?;
        let first_comment_id: usize = 1;

        for i in first_comment_id..=num_incoming_comments {
            // Lookup incoming comment
            let incoming_k = [&incoming_pid_ivec, &u32_to_ivec(i as u32)].concat();
            let incoming_v_opt = &incoming_post_comments_tree.get(incoming_k)?;
            if incoming_v_opt.is_none() {
                let msg = format!(
                    "comment vector for i {0}, incoming pid {1} not found",
                    i, incoming_pid
                );
                return Err(AppError::Custom(msg));
            }
            let incoming_v = incoming_v_opt.clone().unwrap();
            let (comment, _): (Comment, usize) =
                bincode::decode_from_slice(&incoming_v, standard())?;

            // Create new comment
            // This id should match the incoming one, but we still need to update current db
            let cid = incr_id(post_comments_count_tree, &pid_ivec)?;
            if cid != comment.cid {
                let msg = format!(
                    "comment ids do not match. incoming cid {0}, new cid {1}",
                    comment.cid, cid
                );
                return Err(AppError::Custom(msg));
            }
            let cid_ivec = u32_to_ivec(cid);

            info!("creating comment. cid {0}", cid);

            let new_comment = Comment {
                cid: cid,
                pid: pid, // Use new pid
                uid: uid,
                reply_to: comment.reply_to,
                content: comment.content,
                created_at: comment.created_at,
                is_hidden: comment.is_hidden,
            };

            let k = [&pid_ivec, &cid_ivec].concat();
            set_one_with_key(db, "post_comments", k, &new_comment)?;

            let k = [&uid_ivec, &pid_ivec, &cid_ivec].concat();
            db.open_tree("user_comments")?.insert(k, &[])?;

            // only the fellow could update the timeline by adding comment
            let inn_role = InnRole::get(db, iid, uid)?;
            if inn_role >= Some(InnRole::Fellow) {
                let inn_type = inn_rm_index(db, iid, pid)?;
                inn_add_index(db, iid, pid, new_comment.created_at as u32, inn_type)?;
            }

            User::update_stats(db, uid, "comment")?;

            if inn.is_open_access() {
                db.open_tree("tan")?
                    .insert(format!("comt{}/{}", pid, cid), &[])?;
            }
        }
    }

    // TODO Insert migration completion.
    // let migration = Migration { complete: true };
    // set_one(&m_db, MIGRATION_TREE, MIGRATION_ID, &migration)?;

    info!("migration complete");
    Ok(true)
}
