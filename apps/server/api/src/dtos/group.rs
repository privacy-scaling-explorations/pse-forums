use domain::Group;
use serde::{Deserialize, Serialize};
use services::{CreateGroupData, UpdateGroupData};
use specta::Type;
use struct_convert::Convert;

#[derive(Deserialize, Type)]
pub struct CreateGroupDto {
    pub name: String,
    pub description: String,
    pub tags: Option<Vec<String>>,
}

impl TryFrom<CreateGroupDto> for CreateGroupData {
    type Error = domain::ValidationError;

    fn try_from(dto: CreateGroupDto) -> Result<Self, Self::Error> {
        Ok(Self {
            name: dto.name.try_into()?,
            description: dto.description.try_into()?,
            tags: dto.tags,
        })
    }
}

#[derive(Deserialize, Type)]
pub struct UpdateGroupDto {
    pub description: Option<String>,
    pub id: i32,
    pub name: Option<String>,
    pub tags: Option<Vec<String>>,
}

impl TryFrom<UpdateGroupDto> for UpdateGroupData {
    type Error = domain::ValidationError;

    fn try_from(dto: UpdateGroupDto) -> Result<Self, Self::Error> {
        if dto.description.is_none() && dto.name.is_none() && dto.tags.is_none() {
            return Err(domain::ValidationError::EmptyFields);
        }

        Ok(Self {
            description: dto.description.map(|d| d.try_into()).transpose()?,
            id: dto.id,
            name: dto.name.map(|n| n.try_into()).transpose()?,
            tags: dto.tags,
        })
    }
}

#[derive(Convert, Serialize, Type)]
#[convert(from = "Group")]
pub struct GroupDto {
    pub id: i32,
    pub name: String,
    pub description: String,
    pub tags: Vec<String>,
}
