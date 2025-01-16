use crate::{user::CreateUserData, UserService};
use derive_more::derive::Constructor;
use domain::Create;
use domain::User;
use std::sync::Arc;
use thiserror::Error;

use super::crypto::{hash_pwd, verify_pwd};

#[derive(Error, Debug)]
pub enum AuthError {
    #[error("Invalid credentials")]
    InvalidCredentials,
    #[error("Hashing error: {0}")]
    HashError(String),
}

pub struct SignupData {
    pub email: String,
    pub pwd: String,
    pub username: String,
}

#[derive(Clone, Debug)]
pub struct SigninData {
    pub email: String,
    pub pwd: String,
}

impl Into<CreateUserData> for SignupData {
    fn into(self) -> CreateUserData {
        let (salt, pwd) = hash_pwd(&self.pwd).expect("Failed to hash password");
        CreateUserData {
            username: self.username,
            email: self.email,
            pwd,
            salt,
        }
    }
}

#[derive(Constructor)]
pub struct AuthService(Arc<UserService>);

impl AuthService {
    pub async fn signup(&self, payload: SignupData) -> Result<User, AuthError> {
        // Store user with hashed password and salt
        self.0
            .create(payload.into())
            .await
            .map_err(|_| AuthError::InvalidCredentials)
    }

    pub async fn signin(&self, payload: SigninData) -> Result<(), AuthError> {
        let user = self
            .0
            .read(payload.email.clone())
            .await
            .map_err(|_| AuthError::InvalidCredentials)?;

        verify_pwd(&payload.pwd, &user.salt, &user.pwd)
            .map_err(|_| AuthError::InvalidCredentials)?;

        Ok(())
    }
}
