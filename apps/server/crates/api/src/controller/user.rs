use axum::{
    extract::{Path, State},
    Json,
};
//use axum_extra::extract::cookie::Cookie;
use axum_extra::TypedHeader;

use crate::{dto::user::User, error::ApiError, state::AppState};

pub async fn user(
    State(state): State<AppState>,
    Path(username): Path<String>,
    //cookie: Option<TypedHeader<Cookie>>,
) -> Result<Json<User>, ApiError> {
    let _site_config = state.site_config_s.get().await?;
    let user = state
        .user_s
        .find(&username)
        .await?
        .ok_or(ApiError::NotFound)?;
    Ok(Json(user.into()))
}
