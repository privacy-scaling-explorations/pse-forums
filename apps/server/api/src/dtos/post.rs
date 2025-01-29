use serde::{Deserialize, Serialize};
use services::CreatePostData;
use specta::Type;
use struct_convert::Convert;

#[derive(Deserialize, Type)]
pub struct CreatePostDto {
    pub content: String,
    pub gid: Option<i32>,
    pub tags: Option<Vec<String>>,
    pub title: String,
    pub uid: Option<i32>,
}

impl TryFrom<CreatePostDto> for CreatePostData {
    type Error = domain::ValidationError;

    fn try_from(dto: CreatePostDto) -> Result<Self, Self::Error> {
        Ok(Self {
            content: dto.content.try_into()?,
            gid: dto.gid,
            tags: dto.tags,
            title: dto.title.try_into()?,
            uid: dto.uid,
        })
    }
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
