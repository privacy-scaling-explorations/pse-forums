use bincode::{Decode, Encode};

#[derive(Encode, Decode)]
pub struct Claim {
    uid: u32,
    username: String,
    role: u8,
    last_write: i64,
    session_id: String,
    lang: Option<String>,
}
