use domain::Group;
use serde::{Deserialize, Serialize};
use services::CreateGroupData;
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

#[derive(Convert, Serialize, Type)]
#[convert(from = "Group")]
pub struct GroupDto {
    pub id: i32,
    pub name: String,
    pub description: String,
    pub tags: Vec<String>,
}
