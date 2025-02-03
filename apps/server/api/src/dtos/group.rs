use domain::{Claim, Group};
use serde::{Deserialize, Serialize};
use services::{CreateGroupData, UpdateGroupData};
use specta::Type;
use struct_convert::Convert;

#[derive(Deserialize, Type)]
pub struct CreateGroupDto {
    pub create_bandada_group: Option<bool>,
    pub description: String,
    pub name: String,
    pub tags: Option<Vec<String>>,
}

impl CreateGroupDto {
    pub fn transform(self, claim: Claim) -> Result<CreateGroupData, domain::ValidationError> {
        Ok(CreateGroupData {
            bandada_admin_id: self.create_bandada_group.map(|_| claim.uid),
            description: self.description.try_into()?,
            name: self.name.try_into()?,
            tags: self.tags,
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

    fn try_from(
        UpdateGroupDto {
            description,
            id,
            name,
            tags,
        }: UpdateGroupDto,
    ) -> Result<Self, Self::Error> {
        if description.is_none() && name.is_none() && tags.is_none() {
            return Err(domain::ValidationError::EmptyFields);
        }

        Ok(Self {
            description: description.map(|d| d.try_into()).transpose()?,
            id,
            name: name.map(|n| n.try_into()).transpose()?,
            tags,
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
