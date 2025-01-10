use crate::{
    db::{get_id_by_name, get_one},
    error::InfraError,
};
use async_trait::async_trait;
use domain::{error::DomainError, model::user::*};

pub struct SledUserRepository(sled::Db);
impl SledUserRepository {
    pub fn new(db: sled::Db) -> Self {
        Self(db)
    }
}

#[async_trait]
impl UserRepository for SledUserRepository {
    async fn find_by_id(&self, uid: u32) -> Result<Option<User>, DomainError> {
        match get_one(&self.0, "users", uid) {
            Ok(user) => Ok(Some(user)),
            Err(InfraError::NotFound) => Ok(None),
            Err(e) => Err(e.into()),
        }
    }

    async fn find_by_username(&self, username: &str) -> Result<Option<User>, DomainError> {
        match get_id_by_name(&self.0, "usernames", username) {
            Ok(Some(uid)) => self.find_by_id(uid).await,
            Ok(None) => Ok(None),
            Err(e) => Err(e.into()),
        }
    }
}
