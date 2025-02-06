use crate::error::{too_long, too_short, ValidationError};
use nutype::nutype;

const ABOUT_MIN_LEN: usize = 10;
const ABOUT_MAX_LEN: usize = 500;

#[nutype(
    derive(Deserialize, Serialize, Into, TryFrom, Debug,Clone),
    sanitize(trim),
    validate(len_char_min = ABOUT_MIN_LEN, len_char_max = ABOUT_MAX_LEN, not_empty)
)]
pub struct About(String);

impl From<AboutError> for ValidationError {
    fn from(error: AboutError) -> Self {
        match error {
            AboutError::LenCharMinViolated => ValidationError::Content(too_short(ABOUT_MIN_LEN)),
            AboutError::LenCharMaxViolated => ValidationError::Content(too_long(ABOUT_MAX_LEN)),
            AboutError::NotEmptyViolated => ValidationError::Content("Empty".to_string()),
        }
    }
}
