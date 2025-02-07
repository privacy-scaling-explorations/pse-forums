use crate::error::Result;
use crate::InfraError;
use async_trait::async_trait;
use db::{group, user, PrismaClient};
use derive_more::derive::Constructor;
use domain::{Create, Delete, Description, Name, Read, Update};
use std::sync::Arc;

#[derive(Constructor)]
pub struct GroupRepository(Arc<PrismaClient>);

pub struct CreateGroup {
    /// admin id
    pub aid: i32,
    pub anonymous: Option<bool>,
    pub description: Option<Description>,
    pub name: Name,
    pub tags: Option<Vec<String>>,
}

#[async_trait]
impl Create<CreateGroup, Result<group::Data>> for GroupRepository {
    async fn create(
        &self,
        CreateGroup {
            aid,
            anonymous,
            description,
            name,
            tags,
        }: CreateGroup,
    ) -> Result<group::Data> {
        let extra: Vec<group::SetParam> = vec![]
            .into_iter()
            .chain(anonymous.map(|a| group::anonymous::set(a)))
            .chain(description.map(|d| group::description::set(d.into())))
            .chain(tags.map(|t| group::tags::set(t)))
            .collect();
        self.0
            .group()
            .create(name.into(), user::id::equals(aid), extra)
            .exec()
            .await
            .map_err(|e| InfraError::Db(e.to_string()))
    }
}

pub struct UpdateGroup {
    pub description: Option<Description>,
    pub id: i32,
    pub name: Option<Name>,
    pub tags: Option<Vec<String>>,
}

#[async_trait]
impl Update<UpdateGroup, Result<group::Data>> for GroupRepository {
    async fn update(
        &self,
        UpdateGroup {
            description,
            id,
            name,
            tags,
        }: UpdateGroup,
    ) -> Result<group::Data> {
        let updates: Vec<group::SetParam> = vec![]
            .into_iter()
            .chain(description.map(|d| group::description::set(d.into())))
            .chain(name.map(|n| group::name::set(n.into())))
            .chain(tags.map(|t| group::tags::set(t)))
            .collect();

        self.0
            .group()
            .update(group::id::equals(id), updates)
            .exec()
            .await
            .map_err(|e| InfraError::Db(e.to_string()))
    }
}

#[async_trait]
impl Read<i32, Result<group::Data>> for GroupRepository {
    async fn read(&self, id: i32) -> Result<group::Data> {
        self.0
            .group()
            .find_unique(group::id::equals(id))
            .exec()
            .await
            .map_err(|e| InfraError::Db(e.to_string()))?
            .ok_or(InfraError::NotFound)
    }
}

#[async_trait]
impl Read<(), Result<Vec<group::Data>>> for GroupRepository {
    async fn read(&self, _: ()) -> Result<Vec<group::Data>> {
        self.0
            .group()
            .find_many(vec![])
            .exec()
            .await
            .map_err(|e| InfraError::Db(e.to_string()))
    }
}

impl GroupRepository {
    // TODO: gid is nullable in db schema
    // so fetching groupless posts means filtering with gid null?
    // wouldn't it be better to change the schema to gid non nullable and default to 0?
    pub async fn read_with_posts(&self, gid: i32) -> Result<group::Data> {
        self.0
            .group()
            .find_unique(group::id::equals(gid))
            .with(group::posts::fetch(vec![]))
            .exec()
            .await
            .map_err(|e| InfraError::Db(e.to_string()))?
            .ok_or(InfraError::NotFound)
    }
}

#[async_trait]
impl Delete<i32, Result<group::Data>> for GroupRepository {
    async fn delete(&self, id: i32) -> Result<group::Data> {
        self.0
            .group()
            .delete(group::id::equals(id))
            .exec()
            .await
            .map_err(|e| InfraError::Db(e.to_string()))
    }
}
