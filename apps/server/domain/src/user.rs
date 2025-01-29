use crate::{Email, Username};
use chrono::{DateTime, FixedOffset};

pub struct User {
    pub id: i32,
    pub created_at: DateTime<FixedOffset>,
    pub email: Email,
    pub encrypted_password: String,
    pub salt: String,
    pub username: Username,
}

impl From<db::user::Data> for User {
    fn from(data: db::user::Data) -> Self {
        Self {
            id: data.id,
            created_at: data.created_at,
            email: data.email.try_into().unwrap(), // if was inserted successfully in DB it is valid, safe to unwrap
            encrypted_password: data.encrypted_password,
            salt: data.salt,
            username: data.username.try_into().unwrap(), // if was inserted successfully in DB it is valid, safe to unwrap
        }
    }
}
