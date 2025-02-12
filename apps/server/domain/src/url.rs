use anyhow::{anyhow, Error, Result};
use nutype::nutype;
use validator::ValidateUrl;

#[nutype(derive(Deserialize, Serialize, Into, TryFrom, Debug,Clone), validate(with = validate_url, error = Error ))]
pub struct Url(String);

fn validate_url(url: &str) -> Result<()> {
    ValidateUrl::validate_url(&url)
        .then_some(())
        .ok_or(anyhow!("Invalid URL format"))
}
