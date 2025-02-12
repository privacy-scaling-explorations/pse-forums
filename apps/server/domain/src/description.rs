use crate::error::{too_long, too_short};
use anyhow::{anyhow, Error, Result};
use nutype::nutype;

const DESC_MIN_LEN: usize = 10;
const DESC_MAX_LEN: usize = 500;

#[nutype(
    derive(Deserialize, Serialize, Into, TryFrom),
    sanitize(trim),
    validate(with = validate_description, error = Error)
)]
pub struct Description(String);

fn validate_description(description: &str) -> Result<()> {
    match description.len() {
        0 => Ok(()),
        l if l < DESC_MIN_LEN => Err(anyhow!(too_short(DESC_MIN_LEN))),
        l if l > DESC_MAX_LEN => Err(anyhow!(too_long(DESC_MAX_LEN))),
        _ => Ok(()),
    }
}
