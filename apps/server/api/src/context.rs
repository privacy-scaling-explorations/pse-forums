use std::sync::Arc;

use derive_more::derive::Constructor;
use services::UserService;

#[derive(Constructor)]
pub struct Context {
    pub user_service: Arc<UserService>,
}
