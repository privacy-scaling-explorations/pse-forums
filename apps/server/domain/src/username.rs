use anyhow::{anyhow, Error, Result};
use nutype::nutype;
use once_cell::sync::Lazy;
use regex::Regex;

static USERNAME_REGEX: Lazy<Regex> =
    Lazy::new(|| Regex::new(r"^[a-zA-Z0-9_]{1,20}$").expect("Failed to compile username regex"));

#[nutype(
    derive(
        Deserialize,
        Serialize,
        Into,
        TryFrom,
        Clone,
        Eq,
        PartialEq,
        Debug
    ),
    validate(with = validate_username, error = Error)
)]
pub struct Username(String);

fn validate_username(username: &str) -> Result<()> {
    if USERNAME_REGEX.is_match(username) {
        Ok(())
    } else {
        Err(anyhow!(
            "Invalid username: must be alphanumeric (letters, numbers, `_`) and between 1 and 20 characters"
        ))
    }
}
