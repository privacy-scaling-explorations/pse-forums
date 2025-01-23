use serde::{Deserialize, Serialize};
use specta::Type;

#[derive(Deserialize, Serialize, Type)]
pub struct User {
    pub id: i32,
    pub created_at: String,
    pub email: String,
    pub encrypted_password: String,
    pub salt: String,
    pub username: String,
}

impl From<prisma::user::Data> for User {
    fn from(data: prisma::user::Data) -> Self {
        Self {
            id: data.id,
            created_at: data.created_at.to_string(), // or keep using chrono::DateTime?
            email: data.email,
            encrypted_password: data.encrypted_password,
            salt: data.salt,
            username: data.username,
        }
    }
}
