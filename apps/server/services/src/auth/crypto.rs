use hex::encode;
use ring::error::Unspecified;
// https://rust-lang-nursery.github.io/rust-cookbook/cryptography/encryption.html
use ring::pbkdf2::{self, PBKDF2_HMAC_SHA512};
use ring::rand::{SecureRandom, SystemRandom};
use std::num::NonZeroU32;

pub static PBKDF2_ITERATIONS: NonZeroU32 = unsafe { NonZeroU32::new_unchecked(100_000) };
pub const SALT_LEN: usize = 64;
pub const HASH_LEN: usize = 64;

pub fn generate_salt() -> Result<[u8; SALT_LEN], String> {
    let rng = SystemRandom::new();
    let mut salt = [0u8; SALT_LEN];
    rng.fill(&mut salt)
        .map_err(|_| "Failed to generate salt".to_string())?;
    Ok(salt)
}

pub fn hash_pwd(password: &str) -> Result<(String, String), String> {
    let salt = generate_salt()?;
    let mut hashed_password = [0u8; HASH_LEN];
    pbkdf2::derive(
        PBKDF2_HMAC_SHA512,
        PBKDF2_ITERATIONS,
        &salt,
        password.as_bytes(),
        &mut hashed_password,
    );
    Ok((encode(salt), encode(hashed_password)))
}

pub fn verify_pwd(pwd: &str, salt: &[u8], stored_pwd_hash: &[u8]) -> Result<(), Unspecified> {
    pbkdf2::verify(
        PBKDF2_HMAC_SHA512,
        PBKDF2_ITERATIONS,
        salt,
        pwd.as_bytes(),
        stored_pwd_hash,
    )
}
