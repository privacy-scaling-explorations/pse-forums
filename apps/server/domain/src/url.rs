use crate::error::ValidationError;
use nutype::nutype;
use validator::ValidateUrl;

#[nutype(derive(Deserialize, Serialize, Into, TryFrom, Debug,Clone), validate(with = validate_url, error = ValidationError ))]
pub struct Url(String);

fn validate_url(url: &str) -> Result<(), ValidationError> {
    ValidateUrl::validate_url(&url)
        .then_some(())
        .ok_or(ValidationError::Url)
}
