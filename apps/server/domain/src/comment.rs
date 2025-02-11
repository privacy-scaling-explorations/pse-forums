use crate::{content::Content, User};
use chrono::{DateTime, FixedOffset};

#[derive(Debug)]
pub struct Comment {
    pub id: i32,
    pub rid: Option<i32>,
    pub pid: i32,
    pub uid: Option<i32>,
    pub created_at: DateTime<FixedOffset>,
    pub content: Content,
    pub user: Option<User>,
}

impl From<db::comment::Data> for Comment {
    fn from(data: db::comment::Data) -> Self {
        Self {
            id: data.id,
            rid: data.rid,
            pid: data.pid,
            uid: data.uid,
            user: data.user.flatten().map(|u| (*u).into()),
            created_at: data.created_at,
            content: data.content.try_into().unwrap(), // if it is in DB, it's already validated
        }
    }
}
