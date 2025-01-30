use domain::{Profile, ValidationError};
use serde::{Deserialize, Serialize};
use services::UpdateProfileData;
use specta::Type;
use struct_convert::Convert;

#[derive(Convert, Serialize, Type)]
#[convert(from = "Profile")]
pub struct ProfileDto {
    pub id: i32,
    pub about: Option<String>,
    #[convert_field(to_string)]
    pub created_at: String,
    pub username: String,
    pub url: Option<String>,
}

#[derive(Deserialize, Type)]
pub struct UpdateProfileDto {
    pub about: Option<String>,
    pub id: i32,
    pub url: Option<String>,
}

impl TryFrom<UpdateProfileDto> for UpdateProfileData {
    type Error = ValidationError;

    fn try_from(
        UpdateProfileDto { about, id, url }: UpdateProfileDto,
    ) -> Result<Self, Self::Error> {
        if about.is_none() && url.is_none() {
            return Err(ValidationError::EmptyFields);
        }

        Ok(UpdateProfileData {
            about: about.map(|n| n.try_into()).transpose()?,
            id,
            url: url.map(|u| u.try_into()).transpose()?,
        })
    }
}
