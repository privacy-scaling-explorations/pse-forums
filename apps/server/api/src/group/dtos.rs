use serde::{Deserialize, Serialize};
use specta::Type;

#[derive(Deserialize, Type)]
pub struct CreateGroupDto {
    pub name: String,
    pub description: String,
    pub tags: Option<Vec<String>>,
}

impl From<CreateGroupDto> for services::CreateGroupData {
    fn from(dto: CreateGroupDto) -> Self {
        Self {
            name: dto.name,
            description: dto.description,
            tags: dto.tags,
        }
    }
}

#[derive(Serialize, Type)]
pub struct GroupDto {
    pub id: i32,
    pub name: String,
    pub description: String,
    pub tags: Vec<String>,
}

impl From<domain::Group> for GroupDto {
    fn from(dto: domain::Group) -> Self {
        Self {
            id: dto.id,
            name: dto.name,
            description: dto.description,
            tags: dto.tags,
        }
    }
}
