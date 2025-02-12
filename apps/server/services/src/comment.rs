use crate::PostService;
use anyhow::Result;
use async_trait::async_trait;
use derive_more::Constructor;
use domain::{Comment, Content, Create, Delete, Read, Update};
use infra::{CommentRepository, CreateComment, UpdateComment};
use std::sync::Arc;
use struct_convert::Convert;

#[derive(Constructor)]
pub struct CommentService(Arc<CommentRepository>, Arc<PostService>);

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
        self.0.create(comment.into()).await.map(Comment::from)
    }
}

#[async_trait]
impl Read<i32, Result<Comment>> for CommentService {
    async fn read(&self, id: i32) -> Result<Comment> {
        self.0.read(id).await.map(Comment::from)
    }
}

#[async_trait]
impl Read<(), Result<Vec<Comment>>> for CommentService {
    async fn read(&self, _: ()) -> Result<Vec<Comment>> {
        self.0
            .read(())
            .await
            .map(|comments| comments.into_iter().map(Comment::from).collect())
    }
}

#[async_trait]
impl Delete<i32, Result<Comment>> for CommentService {
    async fn delete(&self, id: i32) -> Result<Comment> {
        self.0.delete(id).await.map(Comment::from)
    }
}

#[derive(Convert)]
#[convert(into = "UpdateComment")]
pub struct UpdateCommentData {
    pub id: i32,
    pub content: Content,
}

#[async_trait]
impl Update<UpdateCommentData, Result<Comment>> for CommentService {
    async fn update(&self, comment: UpdateCommentData) -> Result<Comment> {
        self.0.update(comment.into()).await.map(Comment::from)
    }
}

impl CommentService {
    pub async fn list(&self, pid: i32) -> Result<Vec<Comment>> {
        self.1
            .read_with_comments(pid)
            .await
            .map(|p| p.comments.unwrap_or_default())
    }
}
