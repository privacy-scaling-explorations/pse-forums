mod auth;
pub use auth::router::{rspc_auth_router, verify};
mod context;
use axum::{routing::get, Router};
pub use context::Context;
use prisma::init_prisma;
use services::AuthService;
use std::sync::Arc;
use supabase_auth::models::AuthClient;
mod rspc;
pub use rspc::mount;
mod profile;
pub use profile::router::profile_router;

// TODO
// Revisit state/context management
// Is it necessary to arced and clone everything.
// Try to use an axum router returned from a function for auth-verify
// but tricky to manage state in this case
// https://docs.rs/axum/latest/axum/struct.Router.html#returning-routers-with-states-from-functions
pub async fn app() -> Router {
    let prisma = Arc::new(init_prisma().await.unwrap());
    let auth_client = Arc::new(AuthClient::new_from_env().unwrap());
    let router = mount();

    Router::new()
        .route("/", get(|| async { "Hello rspc!" }))
        .nest(
            "/rspc",
            rspc_axum::endpoint(router, move || {
                Context::new(prisma.clone(), auth_client.clone())
            }),
        )
        .route("/auth-verify", get(verify))
        .with_state(Arc::new(AuthService::new(Arc::new(
            AuthClient::new_from_env().unwrap(),
        ))))
}
