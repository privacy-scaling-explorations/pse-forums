use crate::error::Result;
use async_trait::async_trait;
use derive_more::Constructor;
use domain::{Content, Create, Delete, Post, Read, Title, Update};
use infra::{CreatePost, PostRepository, UpdatePost};
use std::sync::Arc;
use struct_convert::Convert;

#[derive(Constructor)]
pub struct PostService(Arc<PostRepository>);

#[derive(Convert)]
#[convert(into = "CreatePost")]
pub struct CreatePostData {
    pub content: Content,
    pub gid: Option<i32>,
    pub tags: Option<Vec<String>>,
    pub title: Title,
    pub uid: Option<i32>,
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

#[derive(Convert)]
#[convert(into = "UpdatePost")]
pub struct UpdatePostData {
    pub content: Option<Content>,
    pub id: i32,
    pub tags: Option<Vec<String>>,
    pub title: Option<Title>,
}

#[async_trait]
impl Update<UpdatePostData, Result<Post>> for PostService {
    async fn update(&self, post: UpdatePostData) -> Result<Post> {
        self.0
            .update(post.into())
            .await
            .map(Post::from)
            .map_err(|e| e.into())
    }
}
