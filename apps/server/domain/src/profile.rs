use chrono::{DateTime, FixedOffset};
use struct_convert::Convert;

#[derive(Convert)]
#[convert(from = "db::profile::Data")]
pub struct Profile {
    pub id: i32,
    pub about: Option<String>,
    pub created_at: DateTime<FixedOffset>,
    pub username: String,
    pub url: Option<String>,
}
