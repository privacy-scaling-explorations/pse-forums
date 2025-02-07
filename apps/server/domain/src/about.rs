use crate::error::{too_long, too_short, ValidationError};
use nutype::nutype;

const ABOUT_MIN_LEN: usize = 10;
const ABOUT_MAX_LEN: usize = 500;

#[nutype(
    derive(Deserialize, Serialize, Into, TryFrom, Debug,Clone),
    sanitize(trim),
    validate(with = validate_about, error = ValidationError)
)]
pub struct About(String);

fn validate_about(about: &str) -> Result<(), ValidationError> {
    match about.len() {
        0 => Ok(()),
        l if l < ABOUT_MIN_LEN => Err(ValidationError::About(too_short(ABOUT_MIN_LEN))),
        l if l > ABOUT_MAX_LEN => Err(ValidationError::About(too_long(ABOUT_MAX_LEN))),
        _ => Ok(()),
    }
}
