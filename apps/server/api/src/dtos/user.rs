use domain::User;
use serde::{Deserialize, Serialize};
use specta::Type;
use struct_convert::Convert;

#[derive(Convert, Deserialize, Serialize, Type)]
#[convert(from = "User")]
pub struct UserDto {
    #[convert_field(to_string)]
    #[serde(rename = "createdAt")]
    pub created_at: String,
    pub id: i32,
    pub email: String,
    #[serde(rename = "emailConfirmed")]
    pub email_confirmed: bool,
    pub username: String,
}
