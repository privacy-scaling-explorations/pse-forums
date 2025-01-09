use crate::error::DomainError;
use async_trait::async_trait;
use bincode::{Decode, Encode};
use serde::Serialize;

#[derive(Default, Encode, Decode, Serialize, Debug)]
pub struct User {
    pub about: String,
    pub created_at: i64,
    pub role: u8,
    pub password_hash: String,
    pub recovery_hash: Option<String>,
    pub uid: u32,
    pub url: String,
    pub username: String,
}

#[async_trait]
pub trait UserRepository: Send + Sync {
    async fn find_by_id(&self, id: u32) -> Result<Option<User>, DomainError>;
    async fn find_by_username(&self, username: &str) -> Result<Option<User>, DomainError>;
}
