use crate::GroupService;
use anyhow::Result;
use async_trait::async_trait;
use derive_more::Constructor;
use domain::{Content, Create, Delete, Post, Read, Title, Update};
use infra::{CreatePost, PostRepository, UpdatePost};
use std::sync::Arc;
use struct_convert::Convert;

#[derive(Constructor)]
pub struct PostService(Arc<PostRepository>, Arc<GroupService>);

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
        self.0.create(post.into()).await.map(Post::from)
    }
}

#[async_trait]
impl Read<i32, Result<Post>> for PostService {
    async fn read(&self, id: i32) -> Result<Post> {
        self.0.read(id).await.map(Post::from)
    }
}

impl PostService {
    pub async fn read_by_group(&self, gid: i32) -> Result<Vec<Post>> {
        self.0
            .read_by_group(gid)
            .await
            .map(|posts| posts.into_iter().map(Post::from).collect())
    }
}

impl PostService {
    pub async fn read_with_comments(&self, id: i32) -> Result<Post> {
        self.0.read_with_comments(id).await.map(Post::from)
    }
}

#[async_trait]
impl Delete<i32, Result<Post>> for PostService {
    async fn delete(&self, id: i32) -> Result<Post> {
        self.0.delete(id).await.map(Post::from)
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
        self.0.update(post.into()).await.map(Post::from)
    }
}

impl PostService {
    pub async fn list(&self, gid: i32) -> Result<Vec<Post>> {
        self.1
            .read_with_posts(gid)
            .await
            .map(|g| g.posts.unwrap_or_default())
    }
}
