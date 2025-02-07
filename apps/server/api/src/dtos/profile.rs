use domain::{Profile, ValidationError};
use serde::{Deserialize, Serialize};
use services::UpdateProfileReqData;
use specta::Type;
use struct_convert::Convert;

#[derive(Convert, Serialize, Type)]
#[convert(from = "Profile")]
pub struct ProfileDto {
    pub id: i32,
    pub about: String,
    #[convert_field(to_string)]
    #[serde(rename = "createdAt")]
    pub created_at: String,
    pub username: String,
    pub url: String,
}

#[derive(Deserialize, Type)]
pub struct UpdateProfileReqDto {
    #[specta(optional)]
    pub about: Option<String>,
    pub id: i32,
    #[specta(optional)]
    pub url: Option<String>,
    #[specta(optional)]
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
    #[specta(optional)]
    pub jwt: Option<String>,
}
