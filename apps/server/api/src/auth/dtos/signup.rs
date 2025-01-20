use serde::Deserialize;
use services::SignupData;
use specta::Type;

#[derive(Deserialize, Type)]
pub struct SignupRequestDto {
    pub email: String,
    pub username: String,
}

impl From<SignupRequestDto> for SignupData {
    fn from(dto: SignupRequestDto) -> Self {
        Self {
            email: dto.email,
            username: dto.username,
        }
    }
}
