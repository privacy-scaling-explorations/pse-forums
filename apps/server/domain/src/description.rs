use crate::error::{too_long, too_short, ValidationError};
use nutype::nutype;

const DESC_MIN_LEN: usize = 10;
const DESC_MAX_LEN: usize = 500;

#[nutype(
    derive(Deserialize, Serialize, Into, TryFrom),
    sanitize(trim),
    validate(len_char_min = DESC_MIN_LEN, len_char_max = DESC_MAX_LEN, not_empty)
)]
pub struct Description(String);

impl From<DescriptionError> for ValidationError {
    fn from(error: DescriptionError) -> Self {
        match error {
            DescriptionError::LenCharMinViolated => {
                ValidationError::Content(too_short(DESC_MIN_LEN))
            }
            DescriptionError::LenCharMaxViolated => {
                ValidationError::Content(too_long(DESC_MAX_LEN))
            }
            DescriptionError::NotEmptyViolated => ValidationError::Content("Empty".to_string()),
        }
    }
}
