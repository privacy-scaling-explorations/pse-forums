use crate::content::Content;
use chrono::{DateTime, FixedOffset};

pub struct Comment {
    pub id: i32,
    pub rid: Option<i32>,
    pub pid: i32,
    pub uid: Option<i32>,
    pub created_at: DateTime<FixedOffset>,
    pub content: Content,
}

impl From<db::comment::Data> for Comment {
    fn from(data: db::comment::Data) -> Self {
        Self {
            id: data.id,
            rid: data.rid,
            pid: data.pid,
            uid: data.uid,
            created_at: data.created_at,
            content: data.content.try_into().unwrap(), // if it is in DB, it's already validated
        }
    }
}
