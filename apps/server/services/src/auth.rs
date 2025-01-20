use crate::{Result, ServiceError};
use derive_more::derive::Constructor;
use infra::Session;
use reqwest::{
    header::{self, HeaderValue, CONTENT_TYPE},
    Client,
};
use serde_json::json;
use std::sync::Arc;
use supabase_auth::models::{AuthClient, OtpType, VerifyOtpParams, VerifyTokenHashParams};

pub struct SignupData {
    pub email: String,
    pub username: String,
}

#[derive(Constructor)]
pub struct AuthService(Arc<AuthClient>);

impl AuthService {
    /// Passwordless (magic link) sign in
    /// If the user does not exist yet, it will be created
    pub async fn signup(&self, SignupData { email, username }: SignupData) -> Result<()> {
        let mut headers = header::HeaderMap::new();
        headers.insert(
            CONTENT_TYPE,
            HeaderValue::from_str("application/json").unwrap(),
        );
        headers.insert(
            "apikey",
            HeaderValue::from_str(std::env::var("SUPABASE_API_KEY").unwrap().as_str()).unwrap(),
        );

        let body = json!({
            "email": email,
            "data": json!({"username": username}),
            "create_user": true, // Ensure the user is created if not exists
        });

        let client = Client::new();
        let response = client
            .post("http://127.0.0.1:54321/auth/v1/otp")
            .headers(headers)
            .json(&body)
            .send()
            .await
            .map_err(|e| ServiceError::Auth(format!("Request failed: {e}").into()))?;

        // Check response status
        if !response.status().is_success() {
            let error_text = response
                .text()
                .await
                .unwrap_or_else(|_| "Unknown error".into());
            return Err(ServiceError::Auth(
                format!("Magic link signup failed: {error_text}").into(),
            ));
        }

        Ok(())
    }

    pub async fn verify(&self, token_hash: String) -> Result<Session> {
        self.0
            .verify_otp(VerifyOtpParams::TokenHash(VerifyTokenHashParams {
                otp_type: OtpType::default(),
                token_hash,
            }))
            .await
            .map(Session::from)
            .map_err(|e| ServiceError::Auth(e.into()))
    }
}
