use crate::error::Result;
use crate::InfraError;
use async_trait::async_trait;
use derive_more::derive::Constructor;
use domain::{Create, Delete, Read};
use prisma::comment;
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
        // TODO: write a macro to generate this
        let extra: Vec<comment::UncheckedSetParam> = vec![]
            .into_iter()
            .chain(rid.map(|_| comment::UncheckedSetParam::Rid(rid)))
            .chain(uid.map(|_| comment::UncheckedSetParam::Uid(uid)))
            .collect();

        // FIXME: make it work with create instead of unchecked?
        // https://prisma.brendonovich.dev/writing-data/create
        self.0
            .comment()
            .create_unchecked(pid, content, extra)
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
