use chrono::{DateTime, FixedOffset};
use db::email_confirmation;
use nutype::nutype;

#[nutype(
    derive(Deserialize, Serialize, TryFrom, Display, Clone),
    validate(not_empty)
)]
pub struct Token(String);

pub struct EmailConfirmation {
    pub expires_at: DateTime<FixedOffset>,
    pub id: i32,
    pub token: Token,
    pub uid: i32,
}

impl From<email_confirmation::Data> for EmailConfirmation {
    fn from(data: email_confirmation::Data) -> Self {
        Self {
            expires_at: data.expires_at,
            id: data.id,
            token: data.token.try_into().unwrap(), // if it is coming from db, it should be valid already
            uid: data.uid,
        }
    }
}
