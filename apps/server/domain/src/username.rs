use crate::ValidationError;
use nutype::nutype;

#[nutype(
    derive(
        Deserialize,
        Serialize,
        Into,
        TryFrom,
        Clone,
        Eq,
        PartialEq,
        Debug,
        Clone
    ),
    validate(regex = "^[a-zA-Z0-9_]{1,20}$")
)]
pub struct Username(String);

impl From<UsernameError> for ValidationError {
    fn from(_: UsernameError) -> Self {
        ValidationError::Username("Invalid username (should be alphanumeric and between 1 and 20 characters, `_` is allowed)".to_string())
    }
}
