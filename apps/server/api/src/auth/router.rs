use std::sync::Arc;

use super::dtos::SigninRequestDto;
use crate::Context;
use axum::{
    extract::{Query, State},
    http::StatusCode,
    response::Redirect,
};
use axum_extra::extract::cookie::{Cookie, CookieJar, SameSite};
use rspc::{Router, RouterBuilder};
use serde::Deserialize;
use services::AuthService;

pub fn rspc_auth_router() -> RouterBuilder<Context> {
    Router::<Context>::new().mutation("signin", |t| {
        t(|ctx, signin_dto: SigninRequestDto| async move {
            ctx.auth_service
                .signin(signin_dto.into())
                .await
                .map_err(|e| rspc::Error::new(rspc::ErrorCode::InternalServerError, e.to_string()))
        })
    })
}

#[derive(Deserialize)]
pub struct VerifyQuery {
    token_hash: String,
}

pub async fn verify(
    State(auth_service): State<Arc<AuthService>>,
    Query(VerifyQuery { token_hash }): Query<VerifyQuery>,
    cookies: CookieJar,
) -> Result<(CookieJar, Redirect), StatusCode> {
    if let Ok(session) = auth_service.verify(token_hash).await {
        Ok((
            // TODO: handle prod vs dev, set stricter cookie options (.secure(true)) in prod
            cookies
                .add(
                    Cookie::build(("access_token", session.access_token))
                        .domain("localhost")
                        .http_only(true)
                        .path("/")
                        .same_site(SameSite::Lax)
                        .secure(true),
                )
                .add(
                    Cookie::build(("refresh_token", session.refresh_token))
                        .domain("localhost")
                        .http_only(true)
                        .path("/")
                        .same_site(SameSite::Lax), //.secure(true),
                ),
            Redirect::to("http://localhost:5173"),
        ))
    } else {
        Err(StatusCode::BAD_REQUEST)
    }
}
