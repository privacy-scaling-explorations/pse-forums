use crate::error::Result;
use crate::InfraError;
use async_trait::async_trait;
use db::{group, PrismaClient};
use derive_more::derive::Constructor;
use domain::{Create, Delete, Read};
use std::sync::Arc;

#[derive(Constructor)]
pub struct GroupRepository(Arc<PrismaClient>);

pub struct CreateGroup {
    pub description: String,
    pub name: String,
    pub tags: Option<Vec<String>>,
}

#[async_trait]
impl Create<CreateGroup, Result<group::Data>> for GroupRepository {
    async fn create(
        &self,
        CreateGroup {
            description,
            name,
            tags,
        }: CreateGroup,
    ) -> Result<group::Data> {
        let extra: Vec<group::SetParam> = vec![]
            .into_iter()
            .chain(tags.map(|t| group::tags::set(t)))
            .collect();
        self.0
            .group()
            .create(description, name, extra)
            .exec()
            .await
            .map_err(|e| InfraError::Db(e.to_string()))
    }
}

// #[async_trait]
// impl Update<group::Data> for GroupRepository {
//     async fn update(&self, data: group::Data) -> Result<group::Data> {
//         self.0
//             .group()
//             .update(data)
//             .exec()
//             .await
//             .map_err(|e| InfraError::Db(e.to_string()))
//     }
// }

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
