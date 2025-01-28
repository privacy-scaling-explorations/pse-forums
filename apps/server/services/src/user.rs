use crate::error::Result;
use async_trait::async_trait;
use derive_more::Constructor;
use domain::{Create, Delete, Read, User};
use infra::{CreateUser, UserRepository};
use std::sync::Arc;
use struct_convert::Convert;

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

#[derive(Convert)]
#[convert(into = "CreateUser")]
pub struct CreateUserData {
    pub email: String,
    pub encrypted_password: String,
    pub salt: String,
    pub username: String,
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

#[async_trait]
impl Delete<String, Result<User>> for UserService {
    async fn delete(&self, username: String) -> Result<User> {
        self.0
            .delete(username)
            .await
            .map(User::from)
            .map_err(|e| e.into())
    }
}
