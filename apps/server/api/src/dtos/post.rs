use anyhow::{anyhow, Result};
use domain::Post;
use serde::{Deserialize, Serialize};
use services::{CreatePostData, UpdatePostData};
use specta::Type;

use super::CommentDto;

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
    type Error = anyhow::Error;

    fn try_from(dto: CreatePostDto) -> Result<Self> {
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
    type Error = anyhow::Error;

    fn try_from(
        UpdatePostDto {
            content,
            id,
            tags,
            title,
        }: UpdatePostDto,
    ) -> Result<Self, Self::Error> {
        if content.is_none() && tags.is_none() && title.is_none() {
            return Err(anyhow!(
                "At least one of content, tags, or title must be provided"
            ));
        }

        Ok(Self {
            content: content.map(|c| c.try_into()).transpose()?,
            id,
            tags,
            title: title.map(|t| t.try_into()).transpose()?,
        })
    }
}

#[derive(Serialize, Type)]
pub struct PostDto {
    #[serde(rename = "createdAt")]
    pub created_at: String,
    pub comments: Vec<CommentDto>,
    pub content: String,
    #[specta(optional)]
    pub group: Option<(i32, String)>,
    pub id: i32,
    pub tags: Vec<String>,
    pub title: String,
    #[specta(optional)]
    pub uid: Option<i32>,
}

impl From<Post> for PostDto {
    fn from(
        Post {
            created_at,
            comments,
            content,
            group,
            id,
            tags,
            title,
            uid,
        }: Post,
    ) -> Self {
        Self {
            created_at: created_at.to_string(),
            comments: comments.into_iter().flatten().map(Into::into).collect(),
            content: content.into(),
            group,
            id,
            tags,
            title: title.into(),
            uid,
        }
    }
}
