use infra::{Session, User};
use serde::Serialize;
use specta::Type;

#[derive(Serialize, Type)]
pub struct SessionDto {
    pub provider_token: Option<String>,
    pub provider_refresh_token: Option<String>,
    pub access_token: String,
    pub token_type: String,
    // rspc uses JSON which does not support big integers (BigInt, i64, u64...)
    pub expires_in: String,
    // rspc uses JSON which does not support big integers (BigInt, i64, u64...)
    pub expires_at: String,
    pub refresh_token: String,
    pub user: User,
}

impl From<Session> for SessionDto {
    fn from(data: Session) -> Self {
        Self {
            provider_token: data.provider_token,
            provider_refresh_token: data.provider_refresh_token,
            access_token: data.access_token,
            token_type: data.token_type,
            expires_in: data.expires_in.to_string(),
            expires_at: data.expires_at.to_string(),
            refresh_token: data.refresh_token,
            user: data.user.into(),
        }
    }
}
