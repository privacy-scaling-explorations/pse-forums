use serde::Serialize;
use specta::Type;

#[derive(Serialize, Type)]
pub struct ProfileDto {
    pub id: i32,
    pub about: Option<String>,
    pub created_at: String,
    pub username: String,
    pub url: Option<String>,
}

impl From<domain::Profile> for ProfileDto {
    fn from(data: domain::Profile) -> Self {
        Self {
            id: data.id,
            about: data.about,
            created_at: data.created_at.to_string(),
            username: data.username,
            url: data.url,
        }
    }
}
