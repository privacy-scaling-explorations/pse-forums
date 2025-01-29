use crate::error::ValidationError;
use nutype::nutype;
use zxcvbn::{zxcvbn, Score};

#[nutype(derive(Deserialize, Serialize, AsRef, TryFrom), validate(with = validate_password, error=ValidationError))]
pub struct Password(String);

fn validate_password(password: &str) -> Result<(), ValidationError> {
    check_length(password)
        .and(check_entropy(password))
        .map_err(ValidationError::from)
}

enum PasswordError {
    TooShort,
    TooLong,
    TooSimple,
}

fn check_length(password: &str) -> Result<(), PasswordError> {
    match password.len() {
        len if len < 8 => Err(PasswordError::TooShort),
        len if len > 40 => Err(PasswordError::TooLong),
        _ => Ok(()),
    }
}

fn check_entropy(password: &str) -> Result<(), PasswordError> {
    match zxcvbn(password, &[]).score() {
        Score::Three | Score::Four => Ok(()),
        _ => Err(PasswordError::TooSimple),
    }
}

impl From<PasswordError> for ValidationError {
    fn from(error: PasswordError) -> Self {
        match error {
            PasswordError::TooShort => ValidationError::Password("Too short (minimum 8 characters)".to_string()),
            PasswordError::TooLong => ValidationError::Password("Too long (maximum 40 characters)".to_string()),
            PasswordError::TooSimple => {
                ValidationError::Password("Too simple (low entropy: try mixing lowercase and uppercase letters, numbers and symbols)".to_string())
            }
        }
    }
}
