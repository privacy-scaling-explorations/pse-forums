use serde::{Deserialize, Serialize};
use std::env;
use std::fs::{self, read_to_string, File};
use std::io::Write;
use std::path::{Path, PathBuf};
use std::sync::LazyLock;
use tracing::{info, warn};

pub static CONFIG: LazyLock<Config> = LazyLock::new(Config::load_config);

#[derive(Serialize, Deserialize)]
pub struct Config {
    pub db: PathBuf,
    pub migration_db: Option<PathBuf>,
    pub snapshots_path: PathBuf,
    pub addr: String,
    pub rebuild_index: Option<bool>,
    pub(crate) avatars_path: PathBuf,
    pub(crate) inn_icons_path: PathBuf,
    pub(crate) upload_path: PathBuf,
    pub(crate) tantivy_path: PathBuf,
    pub(crate) proxy: String,
}

impl Config {
    fn load_config() -> Config {
        let exe_path = env::current_exe().expect("Failed to get current executable path");
        let exe_dir = exe_path
            .parent()
            .expect("Fialed to get executable directory")
            .parent()
            .expect("Failed to get target directory")
            .parent()
            .expect("Failed to get server directory");

        let cfg_file = exe_dir.join(
            env::args()
                .nth(1)
                .unwrap_or_else(|| "config.toml".to_owned()),
        );
        let config = if let Ok(config_toml_content) = read_to_string(&cfg_file) {
            let mut config: Config =
                basic_toml::from_str(&config_toml_content).expect("Failed to parse config.toml");
            config.resolve_paths(&exe_dir);
            config
        } else {
            warn!("Config file not found, using default config.toml");
            let mut config = Config::default();
            config.resolve_paths(&exe_dir);
            let toml = basic_toml::to_string(&config).expect("Failed to serialize config.toml");
            let mut file = File::create(&cfg_file).expect("Failed to create config.toml file");
            file.write_all(toml.as_bytes())
                .expect("Failed to write to config.toml");
            info!("Wrote default config file at {}", &cfg_file.display());
            config
        };

        config.ensure_dirs();
        config
    }

    fn resolve_paths(&mut self, base_dir: &Path) {
        let path_fields: &mut [&mut PathBuf] = &mut [
            &mut self.db,
            &mut self.snapshots_path,
            &mut self.avatars_path,
            &mut self.inn_icons_path,
            &mut self.upload_path,
            &mut self.tantivy_path,
        ];

        for p in path_fields.iter_mut() {
            **p = resolve_path(base_dir, p.as_path());
        }
    }

    fn ensure_dirs(&self) {
        let path_fields = [
            &self.db,
            &self.snapshots_path,
            &self.avatars_path,
            &self.inn_icons_path,
            &self.upload_path,
            &self.tantivy_path,
        ];

        for path in &path_fields {
            check_path(path);
        }
    }
}

impl Default for Config {
    fn default() -> Self {
        Config {
            db: PathBuf::from("freedit.db"),
            migration_db: None,
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

/// Resolve a PathBuf relative to base_dir if it's not absolute
fn resolve_path(base_dir: &Path, path: &Path) -> PathBuf {
    if path.is_absolute() {
        path.to_path_buf()
    } else {
        base_dir.join(path)
    }
}

/// Create new dir if the path doesn't exist.
fn check_path(path: &Path) {
    if !path.exists() {
        fs::create_dir_all(path).unwrap_or_else(|_| {
            panic!(
                "Failed to created necessary dir at {:?}",
                path.canonicalize().unwrap_or_else(|_| path.to_path_buf())
            )
        });
        info!("Created dir: {:?}", path);
    } else {
        info!("Dir already exists {:?}", path);
    }
}
