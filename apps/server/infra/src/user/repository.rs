use crate::error::{InfraError, Result};

use async_trait::async_trait;
use derive_more::Constructor;
use domain::User;
use domain::{Create, Delete, Read, Update};
use prisma::{user, PrismaClient};

#[derive(Constructor)]
pub struct UserRepository(PrismaClient);

#[async_trait]
impl Create<User, Result<User>> for UserRepository {
    async fn create(&self, user: User) -> Result<User> {
        self.0
            .user()
            .create(user.username, user.email, vec![])
            .exec()
            .await
            .map_err(|e| InfraError::Db(e.to_string()))
            .map(User::from)
    }
}

#[async_trait]
impl Read<i32, Result<User>> for UserRepository {
    async fn read(&self, user_id: i32) -> Result<User> {
        self.0
            .user()
            .find_unique(user::id::equals(user_id))
            .exec()
            .await
            .map_err(|e| InfraError::Db(e.to_string()))?
            .map(User::from)
            .ok_or(InfraError::NotFound)
    }
}
