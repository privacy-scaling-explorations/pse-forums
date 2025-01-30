use crate::{error::Result, InfraError};
use async_trait::async_trait;
use chrono::{Duration, Utc};
use db::{email_confirmation, user, PrismaClient};
use derive_more::derive::Constructor;
use domain::Create;
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
