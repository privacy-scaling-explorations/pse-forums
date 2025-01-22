use crate::error::Result;
use async_trait::async_trait;
use derive_more::Constructor;
use domain::{Create, Read, User};
use infra::{CreateUser, UserRepository};
use std::sync::Arc;

#[derive(Constructor)]
pub struct UserService(Arc<UserRepository>);

#[async_trait]
impl Read<String, Result<User>> for UserService {
    async fn read(&self, username: String) -> Result<User> {
        self.0
            .read(username)
            .await
            .map(User::from)
            .map_err(|e| e.into())
    }
}

pub struct CreateUserData {
    pub email: String,
    pub encrypted_password: String,
    pub salt: String,
    pub username: String,
}

impl From<CreateUserData> for CreateUser {
    fn from(data: CreateUserData) -> Self {
        Self {
            email: data.email,
            encrypted_password: data.encrypted_password,
            salt: data.salt,
            username: data.username,
        }
    }
}

#[async_trait]
impl Create<CreateUserData, Result<User>> for UserService {
    async fn create(&self, data: CreateUserData) -> Result<User> {
        self.0
            .create(data.into())
            .await
            .map(User::from)
            .map_err(|e| e.into())
    }
}
