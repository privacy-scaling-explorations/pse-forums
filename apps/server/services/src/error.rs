use infra::InfraError;
use thiserror::Error;

#[derive(Error, Debug)]
pub enum ServiceError {
    #[error("Infra error: {0}")]
    Infra(#[from] crate::error::InfraError),
}

pub type Result<T, E = ServiceError> = std::result::Result<T, E>;
