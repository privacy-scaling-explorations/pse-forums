use serde::{Deserialize, Serialize};
use specta::Type;

#[derive(Deserialize, Type)]
pub struct CreatePostDto {
    pub content: String,
    pub tags: Option<Vec<String>>,
    pub title: String,
    pub uid: Option<i32>,
}

impl From<CreatePostDto> for services::CreatePostData {
    fn from(data: CreatePostDto) -> Self {
        Self {
            content: data.content,
            tags: data.tags,
            title: data.title,
            uid: data.uid,
        }
    }
}

#[derive(Serialize, Type)]
pub struct PostDto {
    pub id: i32,
    pub content: String,
    pub tags: Vec<String>,
    pub title: String,
}

impl From<domain::Post> for PostDto {
    fn from(post: domain::Post) -> Self {
        Self {
            id: post.id,
            content: post.content,
            tags: post.tags,
            title: post.title,
        }
    }
}
