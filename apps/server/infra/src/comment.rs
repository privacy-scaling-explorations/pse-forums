use crate::error::Result;
use crate::InfraError;
use async_trait::async_trait;
use derive_more::derive::Constructor;
use domain::{Create, Delete, Read};
use prisma::comment;
use prisma::post;
use prisma::PrismaClient;
use std::sync::Arc;

#[derive(Constructor)]
pub struct CommentRepository(Arc<PrismaClient>);

pub struct CreateComment {
    pub content: String,
    pub pid: i32,
    pub rid: Option<i32>,
    pub uid: Option<i32>,
}

#[async_trait]
impl Create<CreateComment, Result<comment::Data>> for CommentRepository {
    async fn create(
        &self,
        CreateComment {
            content,
            pid,
            rid,
            uid,
        }: CreateComment,
    ) -> Result<comment::Data> {
        // TODO: write a helper or macro to generate this
        let extra: Vec<comment::SetParam> = vec![]
            .into_iter()
            .chain(rid.map(|id| comment::rid::set(Some(id))))
            .chain(uid.map(|id| comment::uid::set(Some(id))))
            .collect();

        self.0
            .comment()
            .create(content, post::id::equals(pid), extra)
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
impl Read<i32, Result<comment::Data>> for CommentRepository {
    async fn read(&self, id: i32) -> Result<comment::Data> {
        self.0
            .comment()
            .find_unique(comment::id::equals(id))
            .exec()
            .await
            .map_err(|e| InfraError::Db(e.to_string()))?
            .ok_or(InfraError::NotFound)
    }
}

#[async_trait]
impl Delete<i32, Result<comment::Data>> for CommentRepository {
    async fn delete(&self, id: i32) -> Result<comment::Data> {
        self.0
            .comment()
            .delete(comment::id::equals(id))
            .exec()
            .await
            .map_err(|e| InfraError::Db(e.to_string()))
    }
}
