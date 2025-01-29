use super::user::UserDto;
use domain::{Email, Password, Username};
use serde::{Deserialize, Serialize};
use services::{SigninData, SignupData};
use specta::Type;
use struct_convert::Convert;

#[derive(Convert, Deserialize, Type)]
#[convert(into = "SigninData")]
pub struct SigninRequestDto {
    pub username: String,
    pub password: String,
}

#[derive(Serialize, Deserialize, Type)]
pub struct AuthResponseDto {
    pub user: UserDto,
    pub token: String,
}

#[derive(Deserialize, Type)]
pub struct SignupRequestDto {
    pub email: String,
    pub password: String,
    pub username: String,
}

impl TryFrom<SignupRequestDto> for SignupData {
    type Error = String;

    fn try_from(
        SignupRequestDto {
            email,
            password,
            username,
        }: SignupRequestDto,
    ) -> Result<Self, Self::Error> {
        Ok(Self {
            email: email.try_into()?,
            password: password.try_into()?,
            username: username.try_into()?,
        })
    }
}
