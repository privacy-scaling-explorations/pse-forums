use crate::error::Result;
use async_trait::async_trait;
use derive_more::Constructor;
use domain::Read;
use infra::ProfileRepository;
use prisma::profile;
use std::sync::Arc;

#[derive(Constructor)]
pub struct ProfileService(Arc<ProfileRepository>);

#[async_trait]
impl Read<String, Result<profile::Data>> for ProfileService {
    async fn read(&self, username: String) -> Result<profile::Data> {
        self.0.read(username).await.map_err(|e| e.into())
    }
}
