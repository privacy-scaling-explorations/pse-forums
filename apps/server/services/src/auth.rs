use crate::{Result, ServiceError};
use derive_more::derive::Constructor;
use infra::Session;
use reqwest::{
    header::{self, HeaderValue, CONTENT_TYPE},
    Client,
};
use serde_json::json;
use std::sync::Arc;
use supabase_auth::models::{
    AuthClient, OtpType, SignUpWithPasswordOptions, VerifyOtpParams, VerifyTokenHashParams,
};

pub struct SignupData {
    pub email: String,
    pub password: String,
    pub username: String,
}

pub struct SigninWithMagiclinkData {
    pub email: String,
    pub username: String,
}

#[derive(Constructor)]
pub struct AuthService(Arc<AuthClient>);

impl AuthService {
    pub async fn signup(
        &self,
        SignupData {
            email,
            password,
            username,
        }: SignupData,
    ) -> Result<Session> {
        self.0
            .sign_up_with_email_and_password(
                &email,
                &password,
                Some(SignUpWithPasswordOptions {
                    captcha_token: None,
                    data: Some(json!({"username": username})),
                    email_redirect_to: Some("http://localhost:3000/signup/confirm".to_string()),
                }),
            )
            .await
            .map(Session::from)
            .map_err(|e| ServiceError::Auth(e.into())) // rust doesn't chain From conversions, need to inline error mapping
    }

    pub async fn signin_with_magiclink(
        &self,
        SigninWithMagiclinkData { email, username }: SigninWithMagiclinkData,
    ) -> Result<()> {
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
