use crate::{Email, Username};
use chrono::{DateTime, FixedOffset};

#[derive(Debug)]
pub struct User {
    pub id: i32,
    pub created_at: DateTime<FixedOffset>,
    pub email: Email,
    pub email_confirmed: bool,
    pub encrypted_password: String,
    pub memberships: Vec<(i32, String)>,
    pub salt: String,
    pub username: Username,
}

impl From<db::user::Data> for User {
    fn from(data: db::user::Data) -> Self {
        Self {
            id: data.id,
            created_at: data.created_at,
            email: data.email.try_into().unwrap(), // if was inserted successfully in DB it is valid, safe to unwrap
            email_confirmed: data.email_confirmed,
            encrypted_password: data.encrypted_password,
            memberships: data.memberships.map_or_else(
                || vec![],
                |m| {
                    m.into_iter()
                        .filter_map(|m| m.group.map(|g| (g.id, g.name.clone())))
                        .collect()
                },
            ),
            salt: data.salt,
            username: data.username.try_into().unwrap(), // if was inserted successfully in DB it is valid, safe to unwrap
        }
    }
}
