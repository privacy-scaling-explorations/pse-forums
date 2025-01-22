use serde::{Deserialize, Serialize};
use specta::Type;

#[derive(Deserialize, Serialize, Type)]
pub struct Profile {
    pub id: i32,
    pub about: Option<String>,
    pub created_at: String,
    pub username: String,
    pub url: Option<String>,
}

impl From<prisma::profile::Data> for Profile {
    fn from(data: prisma::profile::Data) -> Self {
        Self {
            id: data.id,
            about: data.about,
            created_at: data.created_at.to_string(), // or keep using chrono::DateTime?
            username: data.username,
            url: data.url,
        }
    }
}
