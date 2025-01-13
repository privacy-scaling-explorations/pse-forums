use crate::ServiceError;

use super::Result;
use async_trait::async_trait;
use derive_more::Constructor;
use domain::User;
use domain::{Create, Read};
use infra::UserRepository;
use std::sync::Arc;

#[derive(Clone, Constructor)]
pub struct UserService(Arc<UserRepository>);

#[async_trait]
impl Create<User, Result<User>> for UserService {
    async fn create(&self, user: User) -> Result<User> {
        self.0.create(user).await.map_err(ServiceError::from)
    }
}

#[async_trait]
impl Read<i32, Result<User>> for UserService {
    async fn read(&self, user_id: i32) -> Result<User> {
        self.0.read(user_id).await.map_err(ServiceError::from)
    }
}
