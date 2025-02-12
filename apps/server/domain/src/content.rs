use crate::error::too_short;
use anyhow::{anyhow, Error, Result};
use nutype::nutype;

const CONTENT_MIN_LEN: usize = 10;

#[nutype(
    derive(Debug, Deserialize, Serialize, Into, TryFrom),
    sanitize(trim),
    validate(with=validate_content, error = Error)
)]
pub struct Content(String);

fn validate_content(content: &str) -> Result<()> {
    if content.is_empty() {
        Err(anyhow!("Content cannot be empty"))
    } else if content.chars().count() < CONTENT_MIN_LEN {
        Err(anyhow!(too_short(CONTENT_MIN_LEN)))
    } else {
        Ok(())
    }
}
