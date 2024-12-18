use std::{collections::HashMap, path::PathBuf};

use bincode::{Decode, Encode};
use serde::Serialize;
use sled::Db;
use tracing::info;

use crate::{
    controller::{
        db_utils::{get_batch, get_count, incr_id, u32_to_ivec},
        meta_handler::ParamsPage,
        User,
    },
    ivec_to_u32, set_one, AppError,
};

const MIGRATION_KEY: &[u8] = b"freedit_migration";

#[derive(Default, Encode, Decode, Serialize, Debug)]
struct Migration {
    complete: bool,
}

/// Migrates data from another Freedit instance to this one.
/// Note that this migration is not atomic.
///
/// Includes:
/// - Users
/// - Inns (TODO maybe adds to an existing inn)
/// - Posts
/// - Soloss
/// - Comments
///
pub fn migrate_data_from_freedit(db: &Db, migration_db: PathBuf) -> Result<bool, AppError> {
    info!("moving data from {0} to default db", migration_db.display());

    let config = sled::Config::default().path(migration_db);
    let m_db = config.open()?;

    // Check to see if we've already brought in incoming db
    let existing_migration = m_db.get(MIGRATION_KEY)?;
    if existing_migration.is_some() {
        info!("migration already completed");
        return Ok(true);
    }

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

    // Migrate Inn
    let num_incoming_inns = get_count(&m_db, "default", "inns_count")?;
    info!("processing {0} incoming Inns", num_incoming_inns);

    // TODO If only one inn, just use that (aka merge posts in)

    // Migrate Post
    let num_incoming_posts = get_count(&m_db, "default", "posts_count")?;
    info!("processing {0} incoming Posts", num_incoming_posts);

    // Migrate Solo
    // This may be unnecessary to implement if there are no solo posts
    let num_incoming_solos = get_count(&m_db, "default", "solos_count")?;
    info!("processing {0} incoming Solos", num_incoming_solos);

    // Migrate Comment
    // Note that these are attached to a post/solo.
    // let num_incoming_users = get_count(&m_db, "post_comments_count", pid)?;
    // info!("processing {0} incoming Comments", num_incoming_users);

    // Insert migration completion.

    info!("migration complete");
    Ok(true)
}
