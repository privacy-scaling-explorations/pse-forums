use serde::{Deserialize, Serialize};
use specta::Type;

#[derive(Deserialize, Type)]
pub struct CreatePostDto {
    pub content: String,
    pub gid: Option<i32>,
    pub tags: Option<Vec<String>>,
    pub title: String,
    pub uid: Option<i32>,
}

impl From<CreatePostDto> for services::CreatePostData {
    fn from(data: CreatePostDto) -> Self {
        Self {
            content: data.content,
            gid: data.gid,
            tags: data.tags,
            title: data.title,
            uid: data.uid,
        }
    }
}

#[derive(Serialize, Type)]
pub struct PostDto {
    pub id: i32,
    pub gid: Option<i32>,
    pub content: String,
    pub tags: Vec<String>,
    pub title: String,
}

impl From<domain::Post> for PostDto {
    fn from(post: domain::Post) -> Self {
        Self {
            id: post.id,
            gid: post.gid,
            content: post.content,
            tags: post.tags,
            title: post.title,
        }
    }
}
