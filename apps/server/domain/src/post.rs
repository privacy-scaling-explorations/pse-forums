use serde::Deserialize;
use specta::Type;

#[derive(Deserialize, Type)]
pub struct Post {
    pub id: i32,
    pub uid: Option<i32>,
    pub title: String,
    pub tags: Vec<String>,
    pub content: String,
    pub created_at: String,
}

impl From<prisma::post::Data> for Post {
    fn from(data: prisma::post::Data) -> Self {
        Self {
            id: data.id,
            uid: data.uid,
            title: data.title,
            tags: data.tags,
            content: data.content,
            created_at: data.created_at.to_string(), // TODO: or keep using chrono::DateTime?
        }
    }
}
