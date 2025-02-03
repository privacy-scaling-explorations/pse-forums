use crate::{user::CreateUserData, EmailConfirmationService, UserService};
use chrono::{Duration, FixedOffset, Utc};
use crypto::{hash_pwd, verify_pwd};
use derive_more::derive::Constructor;
use domain::{Claim, Create, Email, Password, Read, Token, User, Username};
use jsonwebtoken::{decode, encode, DecodingKey, EncodingKey, Header, Validation};
use std::sync::Arc;
use thiserror::Error;

#[derive(Error, Debug)]
pub enum AuthError {
    #[error("Email Confirmation Error: {0}")]
    EmailConfirmationError(String),
    #[error("Invalid credentials")]
    InvalidCredentials,
    #[error("JWT error: {0}")]
    JwtError(String),
    #[error("Hashing error: {0}")]
    HashError(String),
}

pub struct SignupData {
    pub email: Email,
    pub password: Password,
    pub username: Username,
}

pub struct SigninData {
    pub username: Username,
    pub password: Password,
}

impl Into<CreateUserData> for SignupData {
    fn into(self) -> CreateUserData {
        let (salt, encrypted_password) =
            hash_pwd(self.password.as_ref()).expect("Failed to hash password");
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
    pub email_confirmation_service: Arc<EmailConfirmationService>,
    pub user_service: Arc<UserService>,
    pub jwt_secret: String,
}

impl AuthService {
    pub fn issue_jwt(&self, user: &User) -> Result<String, AuthError> {
        let exp = Utc::now().with_timezone(&FixedOffset::east_opt(0).unwrap())
            + Duration::seconds(EXPIRATION_DURATION_SECS);

        let claim = Claim {
            uid: user.id,
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

        self.email_confirmation_service
            .send_confirmation_email(user.id, &user.email)
            .await
            .map_err(|e| AuthError::EmailConfirmationError(e.to_string()))?;

        let jwt = self.issue_jwt(&user)?;

        // TODO: receive a semaphore id commitment and add it to ??
        // - bandada.members table with psql trigger on user insert (add new semaphore id commitment column to user table)?
        // - create a whole new commitments table and insert manually here?

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
            .read(username.into())
            .await
            .map_err(|_| AuthError::InvalidCredentials)?;

        verify_pwd(password.as_ref(), &user.salt, &user.encrypted_password)
            .map_err(|_| AuthError::InvalidCredentials)?;

        let jwt = self.issue_jwt(&user)?;

        Ok((user, jwt))
    }

    pub fn validate_jwt(&self, token: &str) -> Result<Claim, AuthError> {
        let validation = Validation::new(jsonwebtoken::Algorithm::HS256);

        decode::<Claim>(
            token,
            &DecodingKey::from_secret(self.jwt_secret.as_ref()),
            &validation,
        )
        .map(|data| data.claims)
        .map_err(|err| AuthError::JwtError(err.to_string()))
    }

    pub async fn confirm_email(&self, token: Token) -> Result<(), AuthError> {
        self.email_confirmation_service
            .confirm_email(token)
            .await
            .map_err(|e| AuthError::EmailConfirmationError(e.to_string()))
    }
}
