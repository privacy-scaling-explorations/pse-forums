use domain::error::DomainError;
use thiserror::Error;

#[derive(Error, Debug)]
pub enum ApiError {
    #[error("{0}")]
    BadRequest(String),
    #[error("{0}")]
    Forbidden(String),
    #[error("{0}")]
    Internal(String),
    #[error("Not found")]
    NotFound,
    #[error("{0}")]
    TooManyRequests(String),
    #[error("{0}")]
    Unauthorized(String),
    #[error("{0}")]
    UnprocessableEntity(String),
}

impl From<DomainError> for ApiError {
    fn from(e: DomainError) -> Self {
        match e {
            DomainError::Banned => Self::Forbidden(e.to_string()),
            DomainError::InnCreateLimit | DomainError::WriteInterval => {
                Self::TooManyRequests(e.to_string())
            }
            DomainError::Internal(e) => Self::Internal(e),
            DomainError::LockedOrHidden | DomainError::NoJoinedInn | DomainError::ReadOnly => {
                Self::Forbidden(e.to_string())
            }
            DomainError::NameExists | DomainError::NameInvalid => Self::BadRequest(e.to_string()),
            DomainError::NonLogin | DomainError::WrongPassword => Self::Unauthorized(e.to_string()),
            DomainError::NotFound => Self::NotFound,
        }
    }
}
