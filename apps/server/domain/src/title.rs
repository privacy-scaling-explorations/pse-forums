use crate::error::too_long;
use anyhow::{anyhow, Error, Result};
use nutype::nutype;

const TITLE_MAX_LEN: usize = 50;

#[nutype(
    derive(Deserialize, Serialize, Into, TryFrom),
    sanitize(trim),
    validate(with = validate_title, error = Error)
)]
pub struct Title(String);

fn validate_title(title: &str) -> Result<()> {
    if title.is_empty() {
        Err(anyhow!("Title cannot be empty"))
    } else if title.chars().count() > TITLE_MAX_LEN {
        Err(anyhow!(too_long(TITLE_MAX_LEN)))
    } else {
        Ok(())
    }
}

pub type Name = Title;
