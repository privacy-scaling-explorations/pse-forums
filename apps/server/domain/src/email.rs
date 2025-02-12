use anyhow::{anyhow, Error, Result};
use nutype::nutype;
use validator::ValidateEmail;

#[nutype(derive(Deserialize, Serialize, Into, TryFrom, AsRef, Debug), validate(with = validate_email, error = Error ))]
pub struct Email(String);

fn validate_email(email: &str) -> Result<()> {
    ValidateEmail::validate_email(&email)
        .then_some(())
        .ok_or(anyhow!("Invalid email format"))
}
