use serde::{Deserialize, Serialize};
use services::{CreatePostData, UpdatePostData};
use specta::Type;
use struct_convert::Convert;

#[derive(Deserialize, Type)]
pub struct CreatePostDto {
    pub content: String,
    #[specta(optional)]
    pub gid: Option<i32>,
    #[specta(optional)]
    pub tags: Option<Vec<String>>,
    pub title: String,
    #[specta(optional)]
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

#[derive(Deserialize, Type)]
pub struct UpdatePostDto {
    #[specta(optional)]
    pub content: Option<String>,
    pub id: i32,
    #[specta(optional)]
    pub tags: Option<Vec<String>>,
    #[specta(optional)]
    pub title: Option<String>,
}

impl TryFrom<UpdatePostDto> for UpdatePostData {
    type Error = domain::ValidationError;

    fn try_from(
        UpdatePostDto {
            content,
            id,
            tags,
            title,
        }: UpdatePostDto,
    ) -> Result<Self, Self::Error> {
        if content.is_none() && tags.is_none() && title.is_none() {
            return Err(domain::ValidationError::EmptyFields);
        }

        Ok(Self {
            content: content.map(|c| c.try_into()).transpose()?,
            id,
            tags,
            title: title.map(|t| t.try_into()).transpose()?,
        })
    }
}

#[derive(Convert, Serialize, Type)]
#[convert(from = "domain::Post")]
pub struct PostDto {
    #[convert_field(to_string)]
    pub created_at: String,
    pub content: String,
    #[specta(optional)]
    pub gid: Option<i32>,
    pub id: i32,
    pub tags: Vec<String>,
    pub title: String,
    #[specta(optional)]
    pub uid: Option<i32>,
}
