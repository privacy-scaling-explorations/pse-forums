use super::user::UserDto;
use domain::ValidationError;
use serde::{Deserialize, Serialize};
use services::{SigninData, SignupData};
use specta::Type;

#[derive(Deserialize, Type)]
pub struct SigninRequestDto {
    pub username: String,
    pub password: String,
}

impl TryFrom<SigninRequestDto> for SigninData {
    type Error = ValidationError;

    fn try_from(
        SigninRequestDto { username, password }: SigninRequestDto,
    ) -> Result<Self, Self::Error> {
        Ok(Self {
            username: username.try_into()?,
            password: password.try_into()?,
        })
    }
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
    type Error = ValidationError;

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
