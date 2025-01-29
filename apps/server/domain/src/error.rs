use thiserror::Error;

#[derive(Debug, Error)]
pub enum ValidationError {
    #[error("Invalid email format")]
    Email,

    #[error("Invalid password: {0}")]
    Password(String),

    #[error("Invalid username: {0}")]
    Username(String),
}
