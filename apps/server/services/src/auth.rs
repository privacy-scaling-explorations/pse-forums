use crate::ServiceError;
use derive_more::derive::Constructor;
use infra::Session;
use std::sync::Arc;
use supabase_auth::models::AuthClient;

pub struct AuthError(pub String);

pub struct SignupData {
    pub email: String,
    pub password: String,
}

#[derive(Constructor)]
pub struct AuthService(Arc<AuthClient>);

impl AuthService {
    pub async fn signup(
        &self,
        SignupData { email, password }: SignupData,
    ) -> Result<Session, ServiceError> {
        self.0
            .sign_up_with_email_and_password(&email, &password, None)
            .await
            .map(Session::from)
            .map_err(|e| ServiceError::Auth(e.into())) // rust doesn't chain From conversions, need to inline error mapping
    }
}
