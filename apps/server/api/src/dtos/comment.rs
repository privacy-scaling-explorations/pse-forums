use domain::Comment;
use serde::{Deserialize, Serialize};
use services::{CreateCommentData, UpdateCommentData};
use specta::Type;
use struct_convert::Convert;

#[derive(Deserialize, Type)]
pub struct CreateCommentDto {
    pub content: String,
    pub pid: i32,
    #[specta(optional)]
    pub rid: Option<i32>,
    #[specta(optional)]
    pub uid: Option<i32>,
}

impl TryFrom<CreateCommentDto> for CreateCommentData {
    type Error = domain::ValidationError;

    fn try_from(dto: CreateCommentDto) -> Result<Self, Self::Error> {
        Ok(Self {
            content: dto.content.try_into()?,
            pid: dto.pid,
            rid: dto.rid,
            uid: dto.uid,
        })
    }
}

#[derive(Deserialize, Type)]
pub struct UpdateCommentDto {
    pub content: String,
    pub id: i32,
}

impl TryFrom<UpdateCommentDto> for UpdateCommentData {
    type Error = domain::ValidationError;

    fn try_from(UpdateCommentDto { id, content }: UpdateCommentDto) -> Result<Self, Self::Error> {
        Ok(Self {
            content: content.try_into()?,
            id,
        })
    }
}

#[derive(Serialize, Type)]
pub struct CommentDto {
    #[serde(rename = "createdAt")]
    pub created_at: String,
    pub content: String,
    pub id: i32,
    pub pid: i32,
    #[specta(optional)]
    pub rid: Option<i32>,
    #[specta(optional)]
    pub uid: Option<i32>,
    #[specta(optional)]
    pub username: Option<String>,
}

impl From<Comment> for CommentDto {
    fn from(comment: Comment) -> Self {
        Self {
            created_at: comment.created_at.to_string(),
            content: comment.content.into(),
            id: comment.id,
            pid: comment.pid,
            rid: comment.rid,
            uid: comment.uid,
            username: comment.user.map(|u| u.username.into()),
        }
    }
}
