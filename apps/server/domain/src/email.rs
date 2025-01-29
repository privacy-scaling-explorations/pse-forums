use crate::error::ValidationError;
use nutype::nutype;
use validator::ValidateEmail;

#[nutype(derive(Deserialize, Serialize, Into, TryFrom), validate(with = validate_email, error = ValidationError ))]
pub struct Email(String);

fn validate_email(email: &str) -> Result<(), ValidationError> {
    ValidateEmail::validate_email(&email)
        .then_some(())
        .ok_or(ValidationError::Email)
}
