use domain::service::site_config::SiteConfigService;
use domain::service::user::UserService;
use infra::repository::site_config::SledConfigRepository;
use infra::repository::user::SledUserRepository;
use sled::Db;
use std::sync::Arc;

// TODO: use builder pattern?
#[derive(Clone)]
pub struct AppState {
    pub site_config_s: Arc<SiteConfigService>,
    pub user_s: Arc<UserService>,
}

impl AppState {
    pub fn new(db: &Db) -> Self {
        let site_config_s = Arc::new(SiteConfigService::new(Arc::new(SledConfigRepository::new(
            db.clone(),
        ))));
        let user_s = Arc::new(UserService::new(Arc::new(SledUserRepository::new(
            db.clone(),
        ))));

        Self {
            site_config_s,
            user_s,
        }
    }
}
