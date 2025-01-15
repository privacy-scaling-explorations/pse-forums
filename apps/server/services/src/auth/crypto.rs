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

#[cfg(test)]
mod tests {
    use super::*;
    use hex::decode;

    #[test]
    fn test_generate_salt_length() {
        let salt = generate_salt().expect("Failed to generate salt");
        assert_eq!(salt.len(), SALT_LEN, "Salt length should be {}", SALT_LEN);
    }

    #[test]
    fn test_generate_salt_uniqueness() {
        let salt1 = generate_salt().expect("Failed to generate first salt");
        let salt2 = generate_salt().expect("Failed to generate second salt");
        assert_ne!(salt1, salt2, "Two consecutive salts should not be equal");
    }

    #[test]
    fn test_hash_pwd_consistency_same_salt() {
        let password = "TestPassword123!";
        let salt = generate_salt().expect("Failed to generate salt");

        let mut hashed_password1 = [0u8; HASH_LEN];
        pbkdf2::derive(
            PBKDF2_HMAC_SHA512,
            PBKDF2_ITERATIONS,
            &salt,
            password.as_bytes(),
            &mut hashed_password1,
        );

        let mut hashed_password2 = [0u8; HASH_LEN];
        pbkdf2::derive(
            PBKDF2_HMAC_SHA512,
            PBKDF2_ITERATIONS,
            &salt,
            password.as_bytes(),
            &mut hashed_password2,
        );

        assert_eq!(
            hashed_password1, hashed_password2,
            "Hashed passwords should be equal when using the same salt and password"
        );
    }

    #[test]
    fn test_hash_pwd_uniqueness_different_salts() {
        let password = "TestPassword123!";
        let (salt1_hex, hash1_hex) = hash_pwd(password).expect("Failed to hash password");
        let (salt2_hex, hash2_hex) = hash_pwd(password).expect("Failed to hash password again");

        assert_ne!(salt1_hex, salt2_hex, "Salts should be unique for each hash");

        let hash1 = decode(&hash1_hex).expect("Failed to decode first hash");
        let hash2 = decode(&hash2_hex).expect("Failed to decode second hash");

        assert_ne!(
            hash1, hash2,
            "Hashed passwords should differ when salts are different"
        );
    }

    #[test]
    fn test_verify_pwd_success() {
        let password = "SecurePassword!@#";
        let (salt_hex, hash_hex) = hash_pwd(password).expect("Failed to hash password");
        let salt = decode(salt_hex).expect("Failed to decode salt");
        let stored_hash = decode(hash_hex).expect("Failed to decode hash");

        let verify_result = verify_pwd(password, &salt, &stored_hash);
        assert!(
            verify_result.is_ok(),
            "Password verification should succeed with correct password"
        );
    }

    #[test]
    fn test_verify_pwd_failure_wrong_password() {
        let password = "SecurePassword!@#";
        let wrong_password = "WrongPassword!!!";
        let (salt_hex, hash_hex) = hash_pwd(password).expect("Failed to hash password");
        let salt = decode(salt_hex).expect("Failed to decode salt");
        let stored_hash = decode(hash_hex).expect("Failed to decode hash");

        let verify_result = verify_pwd(wrong_password, &salt, &stored_hash);
        assert!(
            verify_result.is_err(),
            "Password verification should fail with incorrect password"
        );
    }

    #[test]
    fn test_verify_pwd_failure_wrong_salt() {
        let password = "SecurePassword!@#";
        let wrong_salt = generate_salt().expect("Failed to generate wrong salt");
        let (_, hash_hex) = hash_pwd(password).expect("Failed to hash password");
        let stored_hash = decode(hash_hex).expect("Failed to decode hash");

        let verify_result = verify_pwd(password, &wrong_salt, &stored_hash);
        assert!(
            verify_result.is_err(),
            "Password verification should fail with incorrect salt"
        );
    }

    #[test]
    fn test_hash_pwd_output_length() {
        let password = "AnotherTestPassword!";
        let (_, hash_hex) = hash_pwd(password).expect("Failed to hash password");

        // Each byte is represented by two hex characters
        assert_eq!(
            hash_hex.len(),
            HASH_LEN * 2,
            "Hashed password hex string should be twice the HASH_LEN"
        );
    }
}
