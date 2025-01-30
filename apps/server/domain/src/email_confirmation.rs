use chrono::{DateTime, FixedOffset};
use struct_convert::Convert;

#[derive(Convert)]
#[convert(from = "db::email_confirmation::Data")]
pub struct EmailConfirmation {
    pub expires_at: DateTime<FixedOffset>,
    pub id: i32,
    pub token: String,
    pub uid: i32,
}
