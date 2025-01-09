use domain::service::site_config::SiteConfigService;
use domain::service::user::UserService;
use std::sync::Arc;

#[derive(Clone)]
pub struct AppState {
    pub site_config_s: Arc<SiteConfigService>,
    pub user_s: Arc<UserService>,
}
