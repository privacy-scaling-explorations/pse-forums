use serde::{Deserialize, Serialize};
use services::CreatePostData;
use specta::Type;
use struct_convert::Convert;

#[derive(Convert, Deserialize, Type)]
#[convert(into = "CreatePostData")]
pub struct CreatePostDto {
    pub content: String,
    pub gid: Option<i32>,
    pub tags: Option<Vec<String>>,
    pub title: String,
    pub uid: Option<i32>,
}

#[derive(Convert, Serialize, Type)]
#[convert(from = "domain::Post")]
pub struct PostDto {
    #[convert_field(to_string)]
    pub created_at: String,
    pub content: String,
    pub gid: Option<i32>,
    pub id: i32,
    pub tags: Vec<String>,
    pub title: String,
    pub uid: Option<i32>,
}
