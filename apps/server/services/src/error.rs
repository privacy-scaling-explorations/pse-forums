use infra::InfraError;
use serde::Serialize;
use specta::Type;
use thiserror::Error;

#[derive(Error, Debug, Serialize, Type)]
pub enum ServiceError {
    #[error("Infra error: {0}")]
    Infra(#[from] crate::error::InfraError),
}

pub type Result<T> = std::result::Result<T, ServiceError>;

impl From<ServiceError> for rspc::Error {
    fn from(err: ServiceError) -> Self {
        rspc::Error::new(rspc::ErrorCode::InternalServerError, err.to_string())
    }
}
