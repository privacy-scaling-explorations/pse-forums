use serde::Deserialize;
use services::SigninData;
use specta::Type;

#[derive(Deserialize, Type)]
pub struct SigninRequestDto {
    pub email: String,
    pub username: String,
}

impl From<SigninRequestDto> for SigninData {
    fn from(dto: SigninRequestDto) -> Self {
        Self {
            email: dto.email,
            username: dto.username,
        }
    }
}
