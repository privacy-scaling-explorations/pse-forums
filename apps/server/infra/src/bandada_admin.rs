use anyhow::{anyhow, Context, Result};
use async_trait::async_trait;
use db::{bandada_admin, PrismaClient};
use derive_more::derive::Constructor;
use domain::Read;
use std::sync::Arc;

#[derive(Constructor)]
pub struct BandadaAdminRepository(Arc<PrismaClient>);

#[async_trait]
impl Read<i32, Result<bandada_admin::Data>> for BandadaAdminRepository {
    async fn read(&self, uid: i32) -> Result<bandada_admin::Data> {
        self.0
            .bandada_admin()
            .find_unique(bandada_admin::id::equals(uid))
            .exec()
            .await
            .context("Failed to read Bandada admin record")?
            .ok_or_else(|| anyhow!("Bandada admin record with id {} not found", uid))
    }
}
