use crate::error::{too_long, too_short, ValidationError};
use nutype::nutype;
use zxcvbn::{zxcvbn, Score};

const PASSWORD_MIN_LEN: usize = 10;
const PASSWORD_MAX_LEN: usize = 40;

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
        len if len < PASSWORD_MIN_LEN => Err(PasswordError::TooShort),
        len if len > PASSWORD_MAX_LEN => Err(PasswordError::TooLong),
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
            PasswordError::TooShort => ValidationError::Password(too_short(PASSWORD_MIN_LEN)),
            PasswordError::TooLong => ValidationError::Password(too_long(PASSWORD_MAX_LEN)),
            PasswordError::TooSimple => {
                ValidationError::Password("Too simple (low entropy: try mixing lowercase and uppercase letters, numbers and symbols)".to_string())
            }
        }
    }
}
