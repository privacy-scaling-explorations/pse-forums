use domain::User;
use serde::{Deserialize, Serialize};
use specta::Type;

#[derive(Type, Serialize)]
pub struct MyStruct {}

#[derive(Type, Deserialize, Serialize)]
pub struct UserResponseDto {
    pub id: i32,
    pub email: String,
    pub username: String,
}

impl From<User> for UserResponseDto {
    fn from(user: User) -> Self {
        Self {
            id: user.id,
            email: user.email,
            username: user.username,
        }
    }
}
