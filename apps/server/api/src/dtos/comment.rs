use domain::Comment;
use serde::{Deserialize, Serialize};
use services::{CreateCommentData, UpdateCommentData};
use specta::Type;
use struct_convert::Convert;

#[derive(Deserialize, Type)]
pub struct CreateCommentDto {
    pub content: String,
    pub pid: i32,
    pub rid: Option<i32>,
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

#[derive(Convert, Serialize, Type)]
#[convert(from = "Comment")]
pub struct CommentDto {
    #[convert_field(to_string)]
    pub created_at: String,
    pub content: String,
    pub id: i32,
    pub pid: i32,
    pub rid: Option<i32>,
    pub uid: Option<i32>,
}
