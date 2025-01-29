use crate::error::Result;
use async_trait::async_trait;
use derive_more::Constructor;
use domain::{Comment, Content, Create, Delete, Read};
use infra::{CommentRepository, CreateComment};
use std::sync::Arc;
use struct_convert::Convert;

#[derive(Constructor)]
pub struct CommentService(Arc<CommentRepository>);

#[derive(Convert)]
#[convert(into = "CreateComment")]
pub struct CreateCommentData {
    pub content: Content,
    pub rid: Option<i32>,
    pub pid: i32,
    pub uid: Option<i32>,
}

#[async_trait]
impl Create<CreateCommentData, Result<Comment>> for CommentService {
    async fn create(&self, comment: CreateCommentData) -> Result<Comment> {
        self.0
            .create(comment.into())
            .await
            .map(Comment::from)
            .map_err(|e| e.into())
    }
}

#[async_trait]
impl Read<i32, Result<Comment>> for CommentService {
    async fn read(&self, id: i32) -> Result<Comment> {
        self.0
            .read(id)
            .await
            .map(Comment::from)
            .map_err(|e| e.into())
    }
}

#[async_trait]
impl Delete<i32, Result<Comment>> for CommentService {
    async fn delete(&self, id: i32) -> Result<Comment> {
        self.0
            .delete(id)
            .await
            .map(Comment::from)
            .map_err(|e| e.into())
    }
}

// TODO: Implement Update
