use serde::Deserialize;
use specta::Type;

#[derive(Deserialize, Type)]
pub struct Post {
    pub id: i32,
    pub content: String,
    pub created_at: String,
    pub gid: Option<i32>,
    pub uid: Option<i32>,
    pub title: String,
    pub tags: Vec<String>,
}

impl From<prisma::post::Data> for Post {
    fn from(data: prisma::post::Data) -> Self {
        Self {
            id: data.id,
            created_at: data.created_at.to_string(), // TODO: or keep using chrono::DateTime?
            content: data.content,
            gid: data.gid,
            uid: data.uid,
            title: data.title,
            tags: data.tags,
        }
    }
}
