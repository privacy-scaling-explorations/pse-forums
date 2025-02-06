use infra::InfraError;
use serde::Serialize;
use specta::Type;
use thiserror::Error;

#[derive(Error, Debug, Serialize, Type)]
pub enum ServiceError {
    #[error("Bandada API error: {0}")]
    BandadaApiError(String),
    #[error("Failed to confirm email: {0}")]
    EmailConfirmationFailed(String),
    #[error("Failed to send email confirmation: {0}")]
    EmailConfirmationSendFailed(String),
    #[error("Email confirmation link expired")]
    EmailConfirmationExpired,
    #[error("Infra error: {0}")]
    Infra(#[from] crate::error::InfraError),
    #[error("Failed to issue JWT JWT: {0}")]
    JwtError(String),
}

pub type Result<T> = std::result::Result<T, ServiceError>;

impl From<ServiceError> for rspc::Error {
    fn from(err: ServiceError) -> Self {
        rspc::Error::new(rspc::ErrorCode::InternalServerError, err.to_string())
    }
}
