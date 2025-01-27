use chrono::{DateTime, FixedOffset};
use struct_convert::Convert;

#[derive(Convert)]
#[convert(from = "db::user::Data")]
pub struct User {
    pub id: i32,
    pub created_at: DateTime<FixedOffset>,
    pub email: String,
    pub encrypted_password: String,
    pub salt: String,
    pub username: String,
}
