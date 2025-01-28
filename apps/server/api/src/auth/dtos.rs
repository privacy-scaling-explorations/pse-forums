use crate::user::dtos::UserDto;
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

#[derive(Convert, Deserialize, Type)]
#[convert(into = "SignupData")]
pub struct SignupRequestDto {
    pub email: String,
    pub password: String,
    pub username: String,
}
