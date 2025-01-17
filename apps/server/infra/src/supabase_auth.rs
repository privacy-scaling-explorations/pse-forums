use derive_more::derive::Display;
/*
  This is just wrapping all the models that are part of rspc responses.
  Indeed we must derive specta::Type for them, so we need to bypass the orphan rule.
*/
use serde::{Deserialize, Serialize};
use specta::Type;
use thiserror::Error;

/// <https://supabase.com/docs/guides/auth/sessions>
#[derive(Serialize, Deserialize, Type)]
pub struct Session {
    pub provider_token: Option<String>,
    pub provider_refresh_token: Option<String>,
    pub access_token: String,
    pub token_type: String,
    pub expires_in: i64,
    pub expires_at: u64,
    pub refresh_token: String,
    pub user: User,
}

impl From<supabase_auth::models::Session> for Session {
    fn from(data: supabase_auth::models::Session) -> Self {
        Self {
            provider_token: data.provider_token,
            provider_refresh_token: data.provider_refresh_token,
            access_token: data.access_token,
            token_type: data.token_type,
            expires_in: data.expires_in,
            expires_at: data.expires_at,
            refresh_token: data.refresh_token,
            user: data.user.into(),
        }
    }
}

/// <https://supabase.com/docs/guides/auth/users>
#[derive(Serialize, Deserialize, Type)]
pub struct User {
    pub id: String,
    pub aud: String,
    pub role: String,
    pub email: String,
    pub invited_at: Option<String>,
    pub confirmation_sent_at: Option<String>,
    pub email_confirmed_at: Option<String>,
    pub phone: String,
    pub phone_confirmed_at: Option<String>,
    pub confirmed_at: Option<String>,
    pub recovery_sent_at: Option<String>,
    pub last_sign_in_at: Option<String>,
    pub app_metadata: AppMetadata,
    pub user_metadata: UserMetadata,
    pub identities: Vec<Identity>,
    pub created_at: String,
    pub updated_at: String,
    pub is_anonymous: bool,
}

impl From<supabase_auth::models::User> for User {
    fn from(data: supabase_auth::models::User) -> Self {
        Self {
            id: data.id,
            aud: data.aud,
            role: data.role,
            email: data.email,
            invited_at: data.invited_at,
            confirmation_sent_at: data.confirmation_sent_at,
            email_confirmed_at: data.email_confirmed_at,
            phone: data.phone,
            phone_confirmed_at: data.phone_confirmed_at,
            confirmed_at: data.confirmed_at,
            recovery_sent_at: data.recovery_sent_at,
            last_sign_in_at: data.last_sign_in_at,
            app_metadata: data.app_metadata.into(),
            user_metadata: data.user_metadata.into(),
            identities: data.identities.into_iter().map(|i| i.into()).collect(),
            created_at: data.created_at,
            updated_at: data.updated_at,
            is_anonymous: data.is_anonymous,
        }
    }
}

#[derive(Serialize, Deserialize, Type)]
pub struct UserMetadata {
    pub email: Option<String>,
    pub email_verified: Option<bool>,
    pub phone_verified: Option<bool>,
    pub sub: Option<String>,
}

impl From<supabase_auth::models::UserMetadata> for UserMetadata {
    fn from(data: supabase_auth::models::UserMetadata) -> Self {
        Self {
            email: data.email,
            email_verified: data.email_verified,
            phone_verified: data.phone_verified,
            sub: data.sub,
        }
    }
}

#[derive(Serialize, Deserialize, Type)]
pub struct AppMetadata {
    pub provider: Option<String>,
    pub providers: Option<Vec<String>>,
}

impl From<supabase_auth::models::AppMetadata> for AppMetadata {
    fn from(data: supabase_auth::models::AppMetadata) -> Self {
        Self {
            provider: data.provider,
            providers: data.providers,
        }
    }
}

/// <https://supabase.com/docs/guides/auth/identities>
#[derive(Serialize, Deserialize, Type)]
pub struct Identity {
    pub identity_id: String,
    pub id: String,
    pub user_id: String,
    pub identity_data: IdentityData,
    pub provider: String,
    pub last_sign_in_at: String,
    pub created_at: String,
    pub updated_at: String,
    pub email: Option<String>,
}

impl From<supabase_auth::models::Identity> for Identity {
    fn from(data: supabase_auth::models::Identity) -> Self {
        Self {
            identity_id: data.identity_id,
            id: data.id,
            user_id: data.user_id,
            identity_data: data.identity_data.into(),
            provider: data.provider,
            last_sign_in_at: data.last_sign_in_at,
            created_at: data.created_at,
            updated_at: data.updated_at,
            email: data.email,
        }
    }
}

#[derive(Serialize, Deserialize, Type)]
pub struct IdentityData {
    pub email: Option<String>,
    pub email_verified: bool,
    pub phone_verified: bool,
    pub sub: String,
}

impl From<supabase_auth::models::IdentityData> for IdentityData {
    fn from(data: supabase_auth::models::IdentityData) -> Self {
        Self {
            email: data.email,
            email_verified: data.email_verified,
            phone_verified: data.phone_verified,
            sub: data.sub,
        }
    }
}

#[derive(Serialize, Deserialize, Type, Error, Debug, Display)]
pub struct AuthError(pub String);

impl From<supabase_auth::error::Error> for AuthError {
    fn from(err: supabase_auth::error::Error) -> Self {
        Self(err.to_string())
    }
}
