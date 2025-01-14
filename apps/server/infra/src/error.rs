use serde::Serialize;
use specta::Type;
use thiserror::Error;

#[derive(Error, Debug, Serialize, Type)]
pub enum InfraError {
    #[error("DB error: {0}")]
    Db(String),
    #[error("User not found")]
    NotFound,
}

pub type Result<T> = std::result::Result<T, InfraError>;
