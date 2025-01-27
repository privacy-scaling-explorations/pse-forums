use domain::Comment;
use serde::{Deserialize, Serialize};
use services::CreateCommentData;
use specta::Type;
use struct_convert::Convert;

#[derive(Convert, Deserialize, Type)]
#[convert(into = "CreateCommentData")]
pub struct CreateCommentDto {
    pub content: String,
    pub pid: i32,
    pub rid: Option<i32>,
    pub uid: Option<i32>,
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
