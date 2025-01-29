use thiserror::Error;

#[derive(Debug, Error)]
pub enum ValidationError {
    #[error("Invalid content: {0}")]
    Content(String),

    #[error("Invalid email format")]
    Email,

    #[error("Invalid password: {0}")]
    Password(String),

    #[error("Invalid username: {0}")]
    Username(String),

    #[error("Invalid title: {0}")]
    Title(String),
}
