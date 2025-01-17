use crate::error::Result;
use crate::InfraError;
use async_trait::async_trait;
use derive_more::Constructor;
use domain::Read;
use domain::User;
use prisma::user;
use prisma::PrismaClient;
use std::sync::Arc;

#[derive(Constructor)]
pub struct UserRepository(Arc<PrismaClient>);

#[async_trait]
impl Read<String, Result<User>> for UserRepository {
    async fn read(&self, username: String) -> Result<User> {
        self.0
            .user()
            .find_unique(user::username::equals(username))
            .exec()
            .await
            .map_err(|e| InfraError::Db(e.to_string()))?
            .map(User::from)
            .ok_or(InfraError::NotFound)
    }
}
