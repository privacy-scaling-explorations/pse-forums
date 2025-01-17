use domain::User;
use serde::{Deserialize, Serialize};
use specta::Type;

#[derive(Type, Deserialize, Serialize)]
pub struct UserResponseDto {
    pub id: String,
    pub username: String,
}

impl From<User> for UserResponseDto {
    fn from(user: User) -> Self {
        Self {
            id: user.id,
            username: user.username,
        }
    }
}
