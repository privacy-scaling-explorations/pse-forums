use crate::error::Result;
use crate::InfraError;
use async_trait::async_trait;
use db::{post, PrismaClient};
use derive_more::derive::Constructor;
use domain::{Create, Delete, Read};
use std::sync::Arc;

#[derive(Constructor)]
pub struct PostRepository(Arc<PrismaClient>);

pub struct CreatePost {
    pub content: String,
    pub gid: Option<i32>,
    pub tags: Option<Vec<String>>,
    pub title: String,
    pub uid: Option<i32>,
}

#[async_trait]
impl Create<CreatePost, Result<post::Data>> for PostRepository {
    async fn create(
        &self,
        CreatePost {
            content,
            gid,
            title,
            tags,
            uid,
        }: CreatePost,
    ) -> Result<post::Data> {
        let extra: Vec<post::SetParam> = vec![]
            .into_iter()
            .chain(gid.map(|gid| post::gid::set(Some(gid))))
            .chain(tags.map(|t| post::tags::set(t)))
            .chain(uid.map(|id| post::uid::set(Some(id))))
            .collect();

        self.0
            .post()
            .create(content, title, extra)
            .exec()
            .await
            .map_err(|e| InfraError::Db(e.to_string()))
    }
}

// #[async_trait]
// impl Update<post::Data> for PostRepository {
//     async fn update(&self, data: post::Data) -> Result<post::Data> {
//         self.0
//             .post()
//             .update(data)
//             .exec()
//             .await
//             .map_err(|e| InfraError::Db(e.to_string()))
//     }
// }

#[async_trait]
impl Read<i32, Result<post::Data>> for PostRepository {
    async fn read(&self, id: i32) -> Result<post::Data> {
        self.0
            .post()
            .find_unique(post::id::equals(id))
            .exec()
            .await
            .map_err(|e| InfraError::Db(e.to_string()))?
            .ok_or(InfraError::NotFound)
    }
}

#[async_trait]
impl Read<(), Result<Vec<post::Data>>> for PostRepository {
    async fn read(&self, _: ()) -> Result<Vec<post::Data>> {
        self.0
            .post()
            .find_many(vec![])
            .exec()
            .await
            .map_err(|e| InfraError::Db(e.to_string()))
    }
}

#[async_trait]
impl Delete<i32, Result<post::Data>> for PostRepository {
    async fn delete(&self, id: i32) -> Result<post::Data> {
        self.0
            .post()
            .delete(post::id::equals(id))
            .exec()
            .await
            .map_err(|e| InfraError::Db(e.to_string()))
    }
}
