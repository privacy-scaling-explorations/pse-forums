use thiserror::Error;

#[derive(Error, Debug)]
pub enum InfraError {
    #[error("DB error: {0}")]
    Db(String),
    #[error("User not found")]
    NotFound,
}

pub type Result<T> = std::result::Result<T, InfraError>;
