use crate::error::Result;
use async_trait::async_trait;
use derive_more::Constructor;
use domain::{Profile, Read};
use infra::ProfileRepository;
use std::sync::Arc;

#[derive(Constructor)]
pub struct ProfileService(Arc<ProfileRepository>);

#[async_trait]
impl Read<String, Result<Profile>> for ProfileService {
    async fn read(&self, username: String) -> Result<Profile> {
        self.0
            .read(username)
            .await
            .map(Profile::from)
            .map_err(|e| e.into())
    }
}

#[async_trait]
impl Read<(), Result<Vec<Profile>>> for ProfileService {
    async fn read(&self, _: ()) -> Result<Vec<Profile>> {
        self.0
            .read(())
            .await
            .map(|profiles| profiles.into_iter().map(Profile::from).collect())
            .map_err(|e| e.into())
    }
}
