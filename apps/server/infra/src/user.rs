use crate::error::Result;
use crate::InfraError;
use async_trait::async_trait;
use derive_more::derive::Constructor;
use domain::Create;
use domain::Read;
use prisma::user;
use prisma::PrismaClient;
use std::sync::Arc;

#[derive(Constructor)]
pub struct UserRepository(Arc<PrismaClient>);

#[async_trait]
impl Read<String, Result<user::Data>> for UserRepository {
    async fn read(&self, username: String) -> Result<user::Data> {
        self.0
            .user()
            .find_unique(user::username::equals(username))
            .exec()
            .await
            .map_err(|e| InfraError::Db(e.to_string()))?
            .ok_or(InfraError::NotFound)
    }
}

pub struct CreateUser {
    pub email: String,
    pub encrypted_password: String,
    pub salt: String,
    pub username: String,
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
            .create(email, encrypted_password, salt, username, vec![])
            .exec()
            .await
            .map_err(|e| InfraError::Db(e.to_string()))
    }
}
