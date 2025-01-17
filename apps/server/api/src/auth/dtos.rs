use serde::{Deserialize, Serialize};
use services::SignupData;
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
        }
    }
}
