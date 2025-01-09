use serde::{Deserialize, Serialize};
use std::path::PathBuf;

#[derive(Serialize, Deserialize, Debug)]
pub struct Config {
    pub db: PathBuf,
    pub snapshots_path: PathBuf,
    pub addr: String,
    pub rebuild_index: Option<bool>,
    pub avatars_path: PathBuf,
    pub inn_icons_path: PathBuf,
    pub upload_path: PathBuf,
    pub tantivy_path: PathBuf,
    pub proxy: String,
}

impl Default for Config {
    fn default() -> Self {
        Config {
            db: PathBuf::from("freedit.db"),
            snapshots_path: PathBuf::from("snapshots"),
            addr: "127.0.0.1:3001".into(),
            rebuild_index: None,
            avatars_path: PathBuf::from("static/imgs/avatars"),
            inn_icons_path: PathBuf::from("static/imgs/inn_icons"),
            upload_path: PathBuf::from("static/imgs/upload"),
            tantivy_path: PathBuf::from("tantivy"),
            proxy: "".into(),
        }
    }
}
