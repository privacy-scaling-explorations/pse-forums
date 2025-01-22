use super::crypto::{hash_pwd, verify_pwd};
use crate::{user::CreateUserData, UserService};
use derive_more::derive::Constructor;
use domain::User;
use domain::{Create, Read};
use std::sync::Arc;
use thiserror::Error;

#[derive(Error, Debug)]
pub enum AuthError {
    #[error("Invalid credentials")]
    InvalidCredentials,
    #[error("Hashing error: {0}")]
    HashError(String),
}

pub struct SignupData {
    pub email: String,
    pub password: String,
    pub username: String,
}

#[derive(Clone, Debug)]
pub struct SigninData {
    pub username: String,
    pub password: String,
}

impl Into<CreateUserData> for SignupData {
    fn into(self) -> CreateUserData {
        let (salt, encrypted_password) = hash_pwd(&self.password).expect("Failed to hash password");
        CreateUserData {
            username: self.username,
            email: self.email,
            encrypted_password,
            salt,
        }
    }
}

#[derive(Constructor)]
pub struct AuthService(Arc<UserService>);

impl AuthService {
    pub async fn signup(&self, payload: SignupData) -> Result<User, AuthError> {
        self.0
            .create(payload.into())
            .await
            .map_err(|_| AuthError::InvalidCredentials)
    }

    pub async fn signin(
        &self,
        SigninData {
            password, username, ..
        }: SigninData,
    ) -> Result<User, AuthError> {
        let user = self
            .0
            .read(username.clone())
            .await
            .map_err(|_| AuthError::InvalidCredentials)?;

        verify_pwd(&password, &user.salt, &user.encrypted_password)
            .map_err(|_| AuthError::InvalidCredentials)?;

        Ok(user)
    }
}
