use serde::Deserialize;
use services::SigninData;
use specta::Type;
use struct_convert::Convert;

#[derive(Convert, Deserialize, Type)]
#[convert(into = "SigninData")]
pub struct SigninRequestDto {
    pub username: String,
    pub password: String,
}
