use serde::Deserialize;
use services::SignupData;
use specta::Type;
use struct_convert::Convert;

#[derive(Convert, Deserialize, Type)]
#[convert(into = "SignupData")]
pub struct SignupRequestDto {
    pub email: String,
    pub password: String,
    pub username: String,
}
