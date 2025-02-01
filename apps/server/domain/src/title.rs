use crate::error::{too_long, ValidationError};
use nutype::nutype;

const TITLE_MAX_LEN: usize = 50;

#[nutype(
    derive(Deserialize, Serialize, Into, TryFrom),
    sanitize(trim),
    validate(len_char_max = TITLE_MAX_LEN, not_empty)
)]
pub struct Title(String);

impl From<TitleError> for ValidationError {
    fn from(error: TitleError) -> Self {
        match error {
            TitleError::LenCharMaxViolated => ValidationError::Content(too_long(TITLE_MAX_LEN)),
            TitleError::NotEmptyViolated => ValidationError::Content("Empty".to_string()),
        }
    }
}

pub type Name = Title;
