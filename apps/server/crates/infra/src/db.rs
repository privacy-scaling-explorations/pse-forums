mod utils;
use crate::{config::CONFIG, consts::*};
use sled::Db;
use std::sync::LazyLock;
use tracing::info;
pub use utils::*;

pub static DB: LazyLock<Db> = LazyLock::new(|| {
    info!("sha256: {}", *CURRENT_SHA256);
    info!(VERSION);
    info!(GIT_COMMIT);

    let db_url = &CONFIG.db;
    let config = sled::Config::default().path(db_url);
    let db = config.open().unwrap();
    info!("{}", db_url.display());
    db
});
