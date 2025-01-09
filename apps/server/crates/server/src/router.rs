use axum::{routing::get, Router};

use api::{controller::user::user, state::AppState};

pub fn create_app(state: AppState) -> Router {
    Router::new()
        .route("/user/:username", get(user))
        .with_state(state)
}
