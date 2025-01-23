use serde::{Deserialize, Serialize};
use specta::Type;

#[derive(Deserialize, Type)]
pub struct CreateCommentDto {
    pub content: String,
    pub pid: i32,
    pub rid: Option<i32>,
    pub uid: Option<i32>,
}

impl From<CreateCommentDto> for services::CreateCommentData {
    fn from(data: CreateCommentDto) -> Self {
        Self {
            content: data.content,
            pid: data.pid,
            rid: data.rid,
            uid: data.uid,
        }
    }
}
#[derive(Serialize, Type)]
pub struct CommentDto {
    pub id: i32,
    pub content: String,
    pub pid: i32,
    pub rid: Option<i32>,
    pub uid: Option<i32>,
    pub created_at: String,
}

impl From<domain::Comment> for CommentDto {
    fn from(data: domain::Comment) -> Self {
        Self {
            id: data.id,
            content: data.content,
            pid: data.pid,
            rid: data.rid,
            uid: data.uid,
            created_at: data.created_at,
        }
    }
}
