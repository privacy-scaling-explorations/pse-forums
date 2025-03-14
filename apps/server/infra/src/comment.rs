use anyhow::{anyhow, Context, Result};
use async_trait::async_trait;
use db::{comment, PrismaClient};
use derive_more::derive::Constructor;
use domain::{Content, Create, Delete, Read, Update};
use std::sync::Arc;

#[derive(Constructor)]
pub struct CommentRepository(Arc<PrismaClient>);

pub struct CreateComment {
    pub content: Content,
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
            .create_unchecked(pid, content.into(), extra)
            .exec()
            .await
            .context("Failed to create comment record")
    }
}

pub struct UpdateComment {
    pub id: i32,
    pub content: Content,
}

#[async_trait]
impl Update<UpdateComment, Result<comment::Data>> for CommentRepository {
    async fn update(&self, UpdateComment { content, id }: UpdateComment) -> Result<comment::Data> {
        self.0
            .comment()
            .update(
                comment::id::equals(id),
                vec![comment::content::set(content.into())],
            )
            .exec()
            .await
            .context("Failed to update comment record")
    }
}

#[async_trait]
impl Read<i32, Result<comment::Data>> for CommentRepository {
    async fn read(&self, id: i32) -> Result<comment::Data> {
        self.0
            .comment()
            .find_unique(comment::id::equals(id))
            .exec()
            .await
            .context("Failed to read comment")?
            .ok_or_else(|| anyhow!("Comment record with id {} not found", id))
    }
}

// TODO This should take in a post id to only get comments for that post
#[async_trait]
impl Read<(), Result<Vec<comment::Data>>> for CommentRepository {
    async fn read(&self, _: ()) -> Result<Vec<comment::Data>> {
        self.0
            .comment()
            .find_many(vec![])
            .exec()
            .await
            .context("Failed to read all comment records")
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
            .context("Failed to delete comment record")
    }
}
