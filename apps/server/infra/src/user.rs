use anyhow::{anyhow, Context, Result};
use async_trait::async_trait;
use db::{membership, user, PrismaClient};
use derive_more::derive::Constructor;
use domain::{Create, Delete, Email, Read, Username};
use std::sync::Arc;

#[derive(Constructor)]
pub struct UserRepository(Arc<PrismaClient>);

#[async_trait]
impl Read<String, Result<user::Data>> for UserRepository {
    async fn read(&self, username: String) -> Result<user::Data> {
        self.0
            .user()
            .find_unique(user::username::equals(username.clone()))
            .with(user::memberships::fetch(vec![]).with(membership::group::fetch()))
            .exec()
            .await
            .context("Failed to read user record")?
            .ok_or_else(|| anyhow!("User record with username {} not found", username))
    }
}

pub struct CreateUser {
    pub email: Email,
    pub encrypted_password: String,
    pub salt: String,
    pub username: Username,
}

#[async_trait]
impl Create<CreateUser, Result<user::Data>> for UserRepository {
    async fn create(
        &self,
        CreateUser {
            email,
            encrypted_password,
            salt,
            username,
        }: CreateUser,
    ) -> Result<user::Data> {
        self.0
            .user()
            .create(
                email.into(),
                encrypted_password,
                salt,
                username.into(),
                vec![],
            )
            .exec()
            .await
            .context("Failed to create user record")
    }
}

#[async_trait]
impl Delete<String, Result<user::Data>> for UserRepository {
    async fn delete(&self, username: String) -> Result<user::Data> {
        self.0
            .user()
            .delete(user::username::equals(username))
            .exec()
            .await
            .context("Failed to delete user record")
    }
}
