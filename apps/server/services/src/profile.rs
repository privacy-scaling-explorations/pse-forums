use crate::error::Result;
use async_trait::async_trait;
use derive_more::Constructor;
use domain::{About, Profile, Read, Update, Url};
use infra::{ProfileRepository, UpdateProfile};
use std::sync::Arc;
use struct_convert::Convert;

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

#[derive(Convert)]
#[convert(into = "UpdateProfile")]
pub struct UpdateProfileData {
    pub about: Option<About>,
    pub id: i32,
    pub url: Option<Url>,
}

#[async_trait]
impl Update<UpdateProfileData, Result<Profile>> for ProfileService {
    async fn update(&self, data: UpdateProfileData) -> Result<Profile> {
        self.0
            .update(data.into())
            .await
            .map(Profile::from)
            .map_err(|e| e.into())
    }
}
