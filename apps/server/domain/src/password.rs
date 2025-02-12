use crate::error::{too_long, too_short};
use anyhow::{anyhow, Error, Result};
use nutype::nutype;
use zxcvbn::{zxcvbn, Score};

const PASSWORD_MIN_LEN: usize = 10;
const PASSWORD_MAX_LEN: usize = 40;

#[nutype(derive(Deserialize, Serialize, AsRef, TryFrom), validate(with = validate_password, error=Error))]
pub struct Password(String);

fn validate_password(password: &str) -> Result<()> {
    check_length(password)?;
    check_entropy(password)?;
    Ok(())
}

fn check_length(password: &str) -> Result<()> {
    match password.len() {
        len if len < PASSWORD_MIN_LEN => Err(anyhow!(too_short(PASSWORD_MIN_LEN))),
        len if len > PASSWORD_MAX_LEN => Err(anyhow!(too_long(PASSWORD_MAX_LEN))),
        _ => Ok(()),
    }
}

fn check_entropy(password: &str) -> Result<()> {
    match zxcvbn(password, &[]).score() {
        Score::Three | Score::Four => Ok(()),
        _ => Err(anyhow!("Password too simple (try mixing more lowercase and uppercase letters, numbers and special characters")),
    }
}
