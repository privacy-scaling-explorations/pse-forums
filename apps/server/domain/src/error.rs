use thiserror::Error;

#[derive(Debug, Error)]
pub enum ValidationError {
    #[error("All updatable fields are empty")]
    EmptyFields,

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

    #[error("Invalid url format")]
    Url,
}

pub fn too_long(max_len: usize) -> String {
    format!("Too long (max {} chars)", max_len)
}

pub fn too_short(min_len: usize) -> String {
    format!("Too short (min {} chars)", min_len)
}
