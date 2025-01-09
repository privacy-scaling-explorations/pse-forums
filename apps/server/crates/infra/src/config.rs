use domain::config::Config;
use std::sync::LazyLock;
use std::{
    env,
    fs::{self, read_to_string, File},
    io::Write,
    path::{Path, PathBuf},
};
use tracing::{info, warn};

pub static CONFIG: LazyLock<Config> = LazyLock::new(load_config);

pub fn load_config() -> Config {
    let exe_path = env::current_exe().expect("Failed to get current executable path");
    let exe_dir = exe_path
        .parent()
        .and_then(Path::parent) // TODO: Navigate up directories as needed
        .expect("Failed to get server directory");

    let cfg_file = exe_dir.join(
        env::args()
            .nth(1)
            .unwrap_or_else(|| "config.toml".to_owned()),
    );

    let config = if let Ok(config_toml_content) = read_to_string(&cfg_file) {
        let mut config: Config =
            basic_toml::from_str(&config_toml_content).expect("Failed to parse config.toml");
        resolve_paths(&mut config, exe_dir);
        config
    } else {
        warn!("Config file not found, using default config");
        let mut config = Config::default();
        resolve_paths(&mut config, exe_dir);
        let toml = basic_toml::to_string(&config).expect("Failed to serialize default config");
        let mut file = File::create(&cfg_file).expect("Failed to create config.toml file");
        file.write_all(toml.as_bytes())
            .expect("Failed to write to config.toml");
        info!("Wrote default config file at {}", cfg_file.display());
        config
    };

    ensure_dirs(&config);
    config
}

fn resolve_paths(config: &mut Config, base_dir: &Path) {
    let path_fields: &mut [&mut PathBuf] = &mut [
        &mut config.db,
        &mut config.snapshots_path,
        &mut config.avatars_path,
        &mut config.inn_icons_path,
        &mut config.upload_path,
        &mut config.tantivy_path,
    ];

    for p in path_fields.iter_mut() {
        **p = resolve_path(base_dir, p.as_path());
    }
}

fn ensure_dirs(config: &Config) {
    let path_fields = [
        &config.db,
        &config.snapshots_path,
        &config.avatars_path,
        &config.inn_icons_path,
        &config.upload_path,
        &config.tantivy_path,
    ];

    for path in &path_fields {
        check_path(path);
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
