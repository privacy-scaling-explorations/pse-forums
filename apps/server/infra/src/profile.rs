use crate::error::Result;
use crate::InfraError;
use async_trait::async_trait;
use db::{profile, PrismaClient};
use derive_more::derive::Constructor;
use domain::{About, Read, Update, Url};
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

pub struct UpdateProfile {
    pub about: Option<About>,
    pub id: i32,
    pub url: Option<Url>,
}

#[async_trait]
impl Update<UpdateProfile, Result<profile::Data>> for ProfileRepository {
    async fn update(
        &self,
        UpdateProfile { about, id, url }: UpdateProfile,
    ) -> Result<profile::Data> {
        let updates: Vec<profile::SetParam> = vec![]
            .into_iter()
            .chain(about.map(|a| profile::about::set(Some(a.into()))))
            .chain(url.map(|u| profile::url::set(Some(u.into()))))
            .collect();

        self.0
            .profile()
            .update(profile::id::equals(id), updates)
            .exec()
            .await
            .map_err(|e| InfraError::Db(e.to_string()))
    }
}
