use crate::AuthService;
use anyhow::Result;
use async_trait::async_trait;
use derive_more::Constructor;
use domain::{About, Profile, Read, Update, Url, Username};
use infra::{ProfileRepository, UpdateProfile};
use std::sync::Arc;
use struct_convert::Convert;

#[derive(Constructor)]
pub struct ProfileService(Arc<ProfileRepository>, Arc<AuthService>);

#[async_trait]
impl Read<String, Result<Profile>> for ProfileService {
    async fn read(&self, username: String) -> Result<Profile> {
        self.0.read(username).await.map(Profile::from)
    }
}

#[async_trait]
impl Read<i32, Result<Profile>> for ProfileService {
    async fn read(&self, id: i32) -> Result<Profile> {
        self.0.read(id).await.map(Profile::from)
    }
}

#[async_trait]
impl Read<(), Result<Vec<Profile>>> for ProfileService {
    async fn read(&self, _: ()) -> Result<Vec<Profile>> {
        self.0
            .read(())
            .await
            .map(|profiles| profiles.into_iter().map(Profile::from).collect())
    }
}

#[derive(Convert)]
#[convert(into = "UpdateProfile")]
pub struct UpdateProfileReqData {
    pub about: Option<About>,
    pub id: i32,
    pub username: Option<Username>,
    pub url: Option<Url>,
}

#[async_trait]
impl Update<UpdateProfileReqData, Result<(Profile, Option<String>)>> for ProfileService {
    async fn update(&self, data: UpdateProfileReqData) -> Result<(Profile, Option<String>)> {
        let Profile {
            username: old_username,
            user,
            ..
        } = self.read(data.id).await?;

        let updated_profile = self.0.update(data.into()).await.map(Profile::from)?;

        let jwt = if old_username != updated_profile.username {
            Some(self.1.issue_jwt(&user.unwrap())?)
        } else {
            None
        };

        Ok((updated_profile, jwt))
    }
}
