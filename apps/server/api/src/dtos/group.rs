use anyhow::{anyhow, Result};
use domain::{Claim, Group};
use serde::{Deserialize, Serialize};
use services::{CreateGroupData, UpdateGroupData};
use specta::Type;
use struct_convert::Convert;

use super::PostDto;

#[derive(Deserialize, Type)]
pub struct CreateGroupDto {
    #[specta(optional)]
    pub anonymous: Option<bool>,
    #[specta(optional)]
    pub description: Option<String>,
    pub name: String,
    #[specta(optional)]
    pub tags: Option<Vec<String>>,
}

impl CreateGroupDto {
    pub fn transform(self, claim: Claim) -> Result<CreateGroupData> {
        Ok(CreateGroupData {
            aid: claim.uid,
            anonymous: self.anonymous,
            description: self.description.map(|d| d.try_into()).transpose()?,
            name: self.name.try_into()?,
            tags: self.tags,
        })
    }
}

#[derive(Deserialize, Type)]
pub struct UpdateGroupDto {
    #[specta(optional)]
    pub description: Option<String>,
    pub id: i32,
    #[specta(optional)]
    pub name: Option<String>,
    #[specta(optional)]
    pub tags: Option<Vec<String>>,
}

impl TryFrom<UpdateGroupDto> for UpdateGroupData {
    type Error = anyhow::Error;

    fn try_from(
        UpdateGroupDto {
            description,
            id,
            name,
            tags,
        }: UpdateGroupDto,
    ) -> Result<Self> {
        if description.is_none() && name.is_none() && tags.is_none() {
            return Err(anyhow!(
                "At least one of description, name, or tags must be provided"
            ));
        }

        Ok(Self {
            description: description.map(|d| d.try_into()).transpose()?,
            id,
            name: name.map(|n| n.try_into()).transpose()?,
            tags,
        })
    }
}

#[derive(Serialize, Type)]
pub struct GroupDto {
    pub aid: i32,
    pub anonymous: bool,
    pub id: i32,
    pub name: String,
    pub description: String,
    #[specta(optional)]
    pub posts: Option<Vec<PostDto>>,
    pub tags: Vec<String>,
}

impl From<Group> for GroupDto {
    fn from(group: Group) -> Self {
        Self {
            aid: group.aid,
            anonymous: group.anonymous,
            id: group.id,
            name: group.name.into(),
            description: group.description.into(),
            posts: group
                .posts
                .map(|p| p.into_iter().map(PostDto::from).collect()),
            tags: group.tags,
        }
    }
}
