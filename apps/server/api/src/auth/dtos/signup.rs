use serde::{Deserialize, Serialize};
use services::{SigninWithMagiclinkData, SignupData};
use specta::Type;

#[derive(Debug, Clone, Deserialize, Serialize, Type)]
pub struct SignupRequestDto {
    pub email: String,
    pub password: String,
    pub username: String,
}

impl From<SignupRequestDto> for SignupData {
    fn from(dto: SignupRequestDto) -> Self {
        Self {
            email: dto.email,
            password: dto.password,
            username: dto.username,
        }
    }
}

#[derive(Deserialize, Type)]
pub struct SigninWithMagiclinkRequestDto {
    pub email: String,
    pub username: String,
}

impl From<SigninWithMagiclinkRequestDto> for SigninWithMagiclinkData {
    fn from(dto: SigninWithMagiclinkRequestDto) -> Self {
        Self {
            email: dto.email,
            username: dto.username,
        }
    }
}
