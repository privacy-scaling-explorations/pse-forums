use crate::ServiceError;

use super::Result;
use async_trait::async_trait;
use derive_more::Constructor;
use domain::User;
use domain::{Create, Read};
use infra::{CreateUser, UserRepository};
use std::sync::Arc;

pub struct CreateUserData {
    pub email: String,
    pub pwd: String,
    pub salt: String,
    pub username: String,
}

impl Into<CreateUser> for CreateUserData {
    fn into(self) -> CreateUser {
        CreateUser {
            email: self.email,
            pwd: self.pwd,
            salt: self.salt,
            username: self.username,
        }
    }
}

#[derive(Clone, Constructor)]
pub struct UserService(Arc<UserRepository>);

#[async_trait]
impl Create<CreateUserData, Result<User>> for UserService {
    async fn create(&self, user: CreateUserData) -> Result<User> {
        self.0.create(user.into()).await.map_err(ServiceError::from)
    }
}

impl UserService {
    pub async fn read(&self, email: String) -> Result<User> {
        self.0.read(email).await.map_err(ServiceError::from)
    }
}
