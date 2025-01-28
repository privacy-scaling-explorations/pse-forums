use chrono::{DateTime, FixedOffset};
use struct_convert::Convert;

#[derive(Convert)]
#[convert(from = "db::post::Data")]
pub struct Post {
    pub id: i32,
    pub content: String,
    pub created_at: DateTime<FixedOffset>,
    pub gid: Option<i32>,
    pub uid: Option<i32>,
    pub title: String,
    pub tags: Vec<String>,
}
