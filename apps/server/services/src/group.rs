use crate::error::Result;
use async_trait::async_trait;
use derive_more::Constructor;
use domain::{Create, Delete, Group, Read};
use infra::{CreateGroup, GroupRepository};
use std::sync::Arc;
use struct_convert::Convert;

#[derive(Constructor)]
pub struct GroupService(Arc<GroupRepository>);

#[derive(Convert)]
#[convert(into = "CreateGroup")]
pub struct CreateGroupData {
    pub description: String,
    pub name: String,
    pub tags: Option<Vec<String>>,
}

#[async_trait]
impl Create<CreateGroupData, Result<Group>> for GroupService {
    async fn create(&self, group: CreateGroupData) -> Result<Group> {
        self.0
            .create(group.into())
            .await
            .map(Group::from)
            .map_err(|e| e.into())
    }
}

#[async_trait]
impl Read<i32, Result<Group>> for GroupService {
    async fn read(&self, id: i32) -> Result<Group> {
        self.0.read(id).await.map(Group::from).map_err(|e| e.into())
    }
}

#[async_trait]
impl Read<(), Result<Vec<Group>>> for GroupService {
    async fn read(&self, _: ()) -> Result<Vec<Group>> {
        self.0
            .read(())
            .await
            .map(|groups| groups.into_iter().map(Group::from).collect())
            .map_err(|e| e.into())
    }
}

#[async_trait]
impl Delete<i32, Result<Group>> for GroupService {
    async fn delete(&self, id: i32) -> Result<Group> {
        self.0
            .delete(id)
            .await
            .map(Group::from)
            .map_err(|e| e.into())
    }
}

// TODO: Implement Update
