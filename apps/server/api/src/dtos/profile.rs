use domain::{Profile, ValidationError};
use serde::{Deserialize, Serialize};
use services::UpdateProfileReqData;
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
pub struct UpdateProfileReqDto {
    pub about: Option<String>,
    pub id: i32,
    pub url: Option<String>,
    pub username: Option<String>,
}

impl TryFrom<UpdateProfileReqDto> for UpdateProfileReqData {
    type Error = ValidationError;

    fn try_from(
        UpdateProfileReqDto {
            about,
            id,
            url,
            username,
        }: UpdateProfileReqDto,
    ) -> Result<Self, Self::Error> {
        if about.is_none() && url.is_none() {
            return Err(ValidationError::EmptyFields);
        }

        Ok(UpdateProfileReqData {
            about: about.map(|n| n.try_into()).transpose()?,
            id,
            url: url.map(|u| u.try_into()).transpose()?,
            username: username.map(|u| u.try_into()).transpose()?,
        })
    }
}

#[derive(Serialize, Type)]
pub struct UpdateProfileResDto {
    pub profile: ProfileDto,
    pub jwt: Option<String>,
}
