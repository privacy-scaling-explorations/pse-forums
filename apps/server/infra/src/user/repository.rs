use std::sync::Arc;

use crate::error::{InfraError, Result};

use async_trait::async_trait;
use derive_more::Constructor;
use domain::User;
use domain::{Create, Read};
use prisma::{user, PrismaClient};

pub struct CreateUser {
    pub email: String,
    pub pwd: String,
    pub salt: String,
    pub username: String,
}

#[derive(Constructor)]
pub struct UserRepository(Arc<PrismaClient>);

#[async_trait]
impl Create<CreateUser, Result<User>> for UserRepository {
    async fn create(&self, user: CreateUser) -> Result<User> {
        self.0
            .user()
            .create(user.email, user.pwd, user.salt, user.username, vec![])
            .exec()
            .await
            .map_err(|e| InfraError::Db(e.to_string()))
            .map(User::from)
    }
}

#[async_trait]
impl Read<String, Result<User>> for UserRepository {
    async fn read(&self, email: String) -> Result<User> {
        self.0
            .user()
            .find_unique(user::email::equals(email))
            .exec()
            .await
            .map_err(|e| InfraError::Db(e.to_string()))?
            .map(User::from)
            .ok_or(InfraError::NotFound)
    }
}
