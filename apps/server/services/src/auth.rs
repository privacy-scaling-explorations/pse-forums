use crate::{user::CreateUserData, UserService};
use chrono::{Duration, FixedOffset, Utc};
use crypto::{hash_pwd, verify_pwd};
use derive_more::derive::Constructor;
use domain::{Claim, Create, Read, User};
use jsonwebtoken::{encode, EncodingKey, Header};
use std::sync::Arc;
use thiserror::Error;

#[derive(Error, Debug)]
pub enum AuthError {
    #[error("Invalid credentials")]
    InvalidCredentials,
    #[error("JWT error: {0}")]
    JwtError(String),
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

const EXPIRATION_DURATION_SECS: i64 = 3600;

#[derive(Constructor)]
pub struct AuthService {
    pub user_service: Arc<UserService>,
    pub jwt_secret: String,
}

impl AuthService {
    pub fn issue_jwt(&self, user: &User) -> Result<String, AuthError> {
        let exp = Utc::now().with_timezone(&FixedOffset::east_opt(0).unwrap())
            + Duration::seconds(EXPIRATION_DURATION_SECS);

        let claim = Claim {
            uid: user.id.to_string(),
            exp,
            username: user.username.clone(),
        };

        encode(
            &Header::default(),
            &claim,
            &EncodingKey::from_secret(self.jwt_secret.as_ref()),
        )
        .map_err(|e| AuthError::JwtError(e.to_string()))
    }

    pub async fn signup(&self, payload: SignupData) -> Result<(User, String), AuthError> {
        let user = self
            .user_service
            .create(payload.into())
            .await
            .map_err(|_| AuthError::InvalidCredentials)?;

        let jwt = self.issue_jwt(&user)?;

        Ok((user, jwt))
    }

    pub async fn signin(
        &self,
        SigninData {
            password, username, ..
        }: SigninData,
    ) -> Result<(User, String), AuthError> {
        let user = self
            .user_service
            .read(username.clone())
            .await
            .map_err(|_| AuthError::InvalidCredentials)?;

        verify_pwd(&password, &user.salt, &user.encrypted_password)
            .map_err(|_| AuthError::InvalidCredentials)?;

        let jwt = self.issue_jwt(&user)?;

        Ok((user, jwt))
    }
}
