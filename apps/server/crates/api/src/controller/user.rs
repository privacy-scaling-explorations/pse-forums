use crate::dto::user::User;
use crate::error::ApiError;
use axum::{
    extract::{Path, State},
    Json,
};
use axum_extra::{headers::Cookie, TypedHeader};
use domain::{
    // model::session::Claim,
    service::{site_config::SiteConfigService, user::UserService},
};
use std::sync::Arc;

/// `GET /user/:uid`
pub async fn user(
    State(site_config_s): State<Arc<SiteConfigService>>,
    State(user_s): State<Arc<UserService>>,
    cookie: Option<TypedHeader<Cookie>>,
    Path(username): Path<String>,
) -> Result<Json<User>, ApiError> {
    let site_config = site_config_s.get().await?;
    // let claim = cookie.and_then(|cookie| Claim::get(&DB, &cookie, &site_config)); // TODO
    let user = user_s.find(&username).await?.ok_or(ApiError::NotFound)?;
    Ok(Json(user.into()))
}
