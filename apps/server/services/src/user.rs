use super::Result;
use crate::ServiceError;
use async_trait::async_trait;
use derive_more::Constructor;
use domain::Read;
use domain::User;
use infra::UserRepository;
use std::sync::Arc;

#[derive(Clone, Constructor)]
pub struct UserService(Arc<UserRepository>);

#[async_trait]
impl Read<String, Result<User>> for UserService {
    async fn read(&self, email: String) -> Result<User> {
        self.0.read(email).await.map_err(ServiceError::from)
    }
}
