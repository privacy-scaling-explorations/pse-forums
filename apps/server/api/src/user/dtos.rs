use domain::User;
use serde::Serialize;
use specta::Type;
use struct_convert::Convert;

#[derive(Convert, Serialize, Type)]
#[convert(from = "User")]
pub struct UserDto {
    #[convert_field(to_string)]
    pub created_at: String,
    pub id: i32,
    pub email: String,
    pub encrypted_password: String,
    pub salt: String,
    pub username: String,
}
