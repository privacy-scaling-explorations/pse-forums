use crate::{error::Result, InfraError};
use async_trait::async_trait;
use chrono::{Duration, Utc};
use db::{email_confirmation, user, PrismaClient};
use derive_more::derive::Constructor;
use domain::{Create, Delete, Read, Token};
use std::sync::Arc;

#[derive(Constructor)]
pub struct EmailConfirmationRepository(Arc<PrismaClient>);

#[async_trait]
impl Create<i32, Result<email_confirmation::Data>> for EmailConfirmationRepository {
    async fn create(&self, uid: i32) -> Result<email_confirmation::Data> {
        let expires_at = Utc::now() + Duration::hours(24);

        self.0
            .email_confirmation()
            .create(expires_at.into(), user::id::equals(uid), vec![])
            .exec()
            .await
            .map_err(|e| InfraError::Db(e.to_string()))
    }
}

#[async_trait]
impl Read<Token, Result<email_confirmation::Data>> for EmailConfirmationRepository {
    async fn read(&self, token: Token) -> Result<email_confirmation::Data> {
        self.0
            .email_confirmation()
            .find_unique(email_confirmation::token::equals(token.to_string()))
            .exec()
            .await
            .map_err(|e| InfraError::Db(e.to_string()))?
            .ok_or(InfraError::NotFound)
    }
}

// #[async_trait]
// impl Update<i32, Result<email_confirmation::Data>> for EmailConfirmationRepository {
//     async fn update(&self, uid: i32) -> Result<email_confirmation::Data> {
//         self.0
//             .email_confirmation()
//             .update(email_confirmation::user::id::equals(uid))
//             .exec()
//             .await
//             .map_err(|e| InfraError::Db(e.to_string()))
//     }
// }

#[async_trait]
impl Delete<Token, Result<email_confirmation::Data>> for EmailConfirmationRepository {
    async fn delete(&self, token: Token) -> Result<email_confirmation::Data> {
        self.0
            .email_confirmation()
            .delete(email_confirmation::token::equals(token.to_string()))
            .exec()
            .await
            .map_err(|e| InfraError::Db(e.to_string()))
    }
}
