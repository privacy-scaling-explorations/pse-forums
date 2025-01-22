use serde::Serialize;
use specta::Type;

#[derive(Serialize, Type)]
pub struct UserDto {
    pub id: i32,
    pub created_at: String,
    pub email: String,
    pub encrypted_password: String,
    pub salt: String,
    pub username: String,
}

impl From<domain::User> for UserDto {
    fn from(data: domain::User) -> Self {
        Self {
            id: data.id,
            created_at: data.created_at.to_string(),
            email: data.email,
            encrypted_password: data.encrypted_password,
            salt: data.salt,
            username: data.username,
        }
    }
}
