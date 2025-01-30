use crate::error::{too_short, ValidationError};
use nutype::nutype;

const CONTENT_MIN_LEN: usize = 10;

#[nutype(
    derive(Deserialize, Serialize, Into, TryFrom),
    sanitize(trim),
    validate(len_char_min = CONTENT_MIN_LEN, not_empty)
)]
pub struct Content(String);

impl From<ContentError> for ValidationError {
    fn from(error: ContentError) -> Self {
        match error {
            ContentError::LenCharMinViolated => {
                ValidationError::Content(too_short(CONTENT_MIN_LEN))
            }
            ContentError::NotEmptyViolated => ValidationError::Content("Empty".to_string()),
        }
    }
}
