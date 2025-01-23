use crate::error::Result;
use async_trait::async_trait;
use derive_more::Constructor;
use domain::{Create, Delete, Post, Read};
use infra::{CreatePost, PostRepository};
use std::sync::Arc;

#[derive(Constructor)]
pub struct PostService(Arc<PostRepository>);

pub struct CreatePostData {
    pub content: String,
    pub tags: Option<Vec<String>>,
    pub title: String,
    pub uid: Option<i32>,
}

impl From<CreatePostData> for CreatePost {
    fn from(data: CreatePostData) -> Self {
        Self {
            content: data.content,
            tags: data.tags,
            title: data.title,
            uid: data.uid,
        }
    }
}

#[async_trait]
impl Create<CreatePostData, Result<Post>> for PostService {
    async fn create(&self, post: CreatePostData) -> Result<Post> {
        self.0
            .create(post.into())
            .await
            .map(Post::from)
            .map_err(|e| e.into())
    }
}

#[async_trait]
impl Read<i32, Result<Post>> for PostService {
    async fn read(&self, id: i32) -> Result<Post> {
        self.0.read(id).await.map(Post::from).map_err(|e| e.into())
    }
}

#[async_trait]
impl Read<(), Result<Vec<Post>>> for PostService {
    async fn read(&self, _: ()) -> Result<Vec<Post>> {
        self.0
            .read(())
            .await
            .map(|posts| posts.into_iter().map(Post::from).collect())
            .map_err(|e| e.into())
    }
}

#[async_trait]
impl Delete<i32, Result<Post>> for PostService {
    async fn delete(&self, id: i32) -> Result<Post> {
        self.0
            .delete(id)
            .await
            .map(Post::from)
            .map_err(|e| e.into())
    }
}

// TODO: Implement Update
