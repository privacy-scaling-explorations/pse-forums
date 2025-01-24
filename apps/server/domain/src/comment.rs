use serde::Deserialize;
use specta::Type;

#[derive(Deserialize, Type)]
pub struct Comment {
    pub id: i32,
    pub rid: Option<i32>,
    pub pid: i32,
    pub uid: Option<i32>,
    pub created_at: String,
    pub content: String,
}

impl From<db::comment::Data> for Comment {
    fn from(data: db::comment::Data) -> Self {
        Self {
            id: data.id,
            rid: data.rid,
            pid: data.pid,
            uid: data.uid,
            created_at: data.created_at.to_string(),
            content: data.content,
        }
    }
}
