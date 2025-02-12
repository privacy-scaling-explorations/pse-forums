use crate::{user::CreateUserData, EmailConfirmationService, UserService};
use anyhow::{Context, Result};
use chrono::{Duration, FixedOffset, Utc};
use crypto::{hash_pwd, verify_pwd};
use derive_more::derive::Constructor;
use domain::{Claim, Create, Email, Password, Read, Token, User, Username};
use jsonwebtoken::{decode, encode, DecodingKey, EncodingKey, Header, Validation};
use std::sync::Arc;

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
    pub fn issue_jwt(&self, user: &User) -> Result<String> {
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
        .context("Failed to encode JWT")
    }

    pub async fn signup(&self, payload: SignupData) -> Result<(User, String)> {
        let user = self.user_service.create(payload.into()).await?;

        self.email_confirmation_service
            .send_confirmation_email(user.id, &user.email)
            .await
            .context("Failed to send confirmation email")?;

        let jwt = self.issue_jwt(&user).context("Failed to issue JWT")?;

        // TODO: receive a semaphore id commitment and add it to ?? and how ??
        // - bandada.members table with psql trigger on user insert (add new semaphore id commitment column to user table)?
        // - create a whole new commitments table and insert manually here?
        // - make request to https://api.bandada.pse.dev/#/groups/GroupsController_addMember ?

        Ok((user, jwt))
    }

    pub async fn signin(
        &self,
        SigninData {
            password, username, ..
        }: SigninData,
    ) -> Result<(User, String)> {
        let user = self.user_service.read(username.into()).await?;

        verify_pwd(password.as_ref(), &user.salt, &user.encrypted_password)
            .context("Invalid credentials")?;

        let jwt = self.issue_jwt(&user)?;

        Ok((user, jwt))
    }

    pub fn validate_jwt(&self, token: &str) -> Result<Claim> {
        let validation = Validation::new(jsonwebtoken::Algorithm::HS256);

        decode::<Claim>(
            token,
            &DecodingKey::from_secret(self.jwt_secret.as_ref()),
            &validation,
        )
        .map(|data| data.claims)
        .context("Failed to decode JWT")
    }

    pub async fn confirm_email(&self, token: Token) -> Result<()> {
        self.email_confirmation_service
            .confirm_email(token)
            .await
            .context("Failed to confirm email")
    }
}
