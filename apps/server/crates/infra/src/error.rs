use domain::error::DomainError;
use thiserror::Error;

#[derive(Error, Debug)]
pub enum InfraError {
    #[error("Db error: {}", .0)]
    Db(#[from] sled::Error),
    #[error("Deserialization error: {}", .0)]
    Deserialization(#[from] bincode::error::DecodeError),
    #[error(transparent)]
    IoError(#[from] std::io::Error),
    #[error("Record not found")]
    NotFound,
    #[error("Search engine error: {}", .0)]
    Search(#[from] tantivy::TantivyError),
    #[error("Serialization error: {}", .0)]
    Serialization(#[from] bincode::error::EncodeError),
    #[error(transparent)]
    Utf8Error(#[from] std::str::Utf8Error),

    #[error(transparent)]
    ImageError(#[from] image::ImageError),
}

impl From<InfraError> for DomainError {
    fn from(error: InfraError) -> Self {
        match error {
            InfraError::Db(e) => DomainError::Internal(format!("Db error: {}", e)),
            InfraError::Deserialization(e) => {
                DomainError::Internal(format!("Deserialization error: {}", e))
            }
            InfraError::IoError(e) => DomainError::Internal(format!("Io error: {}", e)),
            InfraError::NotFound => {
                unreachable!("Not found should be handled before reaching conversion")
            }
            InfraError::Search(e) => DomainError::Internal(format!("Search engine error: {}", e)),
            InfraError::Serialization(e) => {
                DomainError::Internal(format!("Serialization error: {}", e))
            }
            InfraError::Utf8Error(e) => DomainError::Internal(format!("Utf8 error: {}", e)),
            InfraError::ImageError(e) => DomainError::Internal(format!("Image error: {}", e)),
        }
    }
}
