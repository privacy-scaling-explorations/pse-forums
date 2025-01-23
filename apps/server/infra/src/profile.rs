use crate::error::Result;
use crate::InfraError;
use async_trait::async_trait;
use derive_more::derive::Constructor;
use domain::Read;
use prisma::profile;
use prisma::PrismaClient;
use std::sync::Arc;

#[derive(Constructor)]
pub struct ProfileRepository(Arc<PrismaClient>);

#[async_trait]
impl Read<String, Result<profile::Data>> for ProfileRepository {
    async fn read(&self, username: String) -> Result<profile::Data> {
        self.0
            .profile()
            .find_unique(profile::username::equals(username))
            .exec()
            .await
            .map_err(|e| InfraError::Db(e.to_string()))?
            .ok_or(InfraError::NotFound)
    }
}

#[async_trait]
impl Read<(), Result<Vec<profile::Data>>> for ProfileRepository {
    async fn read(&self, _: ()) -> Result<Vec<profile::Data>> {
        self.0
            .profile()
            .find_many(vec![])
            .exec()
            .await
            .map_err(|e| InfraError::Db(e.to_string()))
    }
}
