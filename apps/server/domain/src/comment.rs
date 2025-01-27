use chrono::{DateTime, FixedOffset};
use struct_convert::Convert;

#[derive(Convert)]
#[convert(from = "db::comment::Data")]
pub struct Comment {
    pub id: i32,
    pub rid: Option<i32>,
    pub pid: i32,
    pub uid: Option<i32>,
    pub created_at: DateTime<FixedOffset>,
    pub content: String,
}
