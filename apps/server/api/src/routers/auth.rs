use crate::{
    dtos::{AuthResponseDto, SigninRequestDto, SignupRequestDto},
    Context,
};
use axum::{
    extract::{Query, State},
    http::StatusCode,
    response::{IntoResponse, Redirect},
};
use domain::{Token, TokenError, ValidationError};
use rspc::{Router, RouterBuilder};
use services::AuthService;
use std::{env, sync::Arc};

pub fn auth_router() -> RouterBuilder<Context> {
    Router::<Context>::new()
        .mutation("signup", |t| {
            t(|ctx, signup_dto: SignupRequestDto| async move {
                let signup_data = signup_dto.try_into().map_err(|e: ValidationError| {
                    rspc::Error::new(rspc::ErrorCode::BadRequest, e.to_string())
                })?;

                ctx.services
                    .auth
                    .signup(signup_data)
                    .await
                    .map(|(user, token)| AuthResponseDto {
                        user: user.into(),
                        token,
                    })
                    .map_err(|e| {
                        rspc::Error::new(rspc::ErrorCode::InternalServerError, e.to_string())
                    })
            })
        })
        .mutation("signin", |t| {
            t(|ctx, signin_dto: SigninRequestDto| async move {
                let signin_data = signin_dto.try_into().map_err(|e: ValidationError| {
                    rspc::Error::new(rspc::ErrorCode::BadRequest, e.to_string())
                })?;

                ctx.services
                    .auth
                    .signin(signin_data)
                    .await
                    .map(|(user, token)| AuthResponseDto {
                        user: user.into(),
                        token,
                    })
                    .map_err(|e| {
                        rspc::Error::new(rspc::ErrorCode::InternalServerError, e.to_string())
                    })
            })
        })
}

pub async fn confirm_email_handler(
    State(auth_service): State<Arc<AuthService>>,
    Query(token): Query<Token>,
) -> Result<Redirect, (StatusCode, Redirect)> {
    let frontend_url = env::var("FRONTEND_URL").expect("Missing FRONTEND_URL env var");

    match auth_service.confirm_email(token).await {
        Ok(_) => Ok(Redirect::temporary(&format!(
            "{}/auth/signin",
            frontend_url
        ))),
        Err(e) => Err((
            StatusCode::UNAUTHORIZED,
            Redirect::temporary(&format!("{}/error?reason={}", frontend_url, e)),
        )),
    }
}
