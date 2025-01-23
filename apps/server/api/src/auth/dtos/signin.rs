use serde::Deserialize;
use services::SigninData;
use specta::Type;

#[derive(Deserialize, Type)]
pub struct SigninRequestDto {
    pub username: String,
    pub password: String,
}

impl From<SigninRequestDto> for SigninData {
    fn from(dto: SigninRequestDto) -> Self {
        Self {
            username: dto.username,
            password: dto.password,
        }
    }
}
