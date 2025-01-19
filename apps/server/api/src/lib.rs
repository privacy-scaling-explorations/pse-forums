mod auth;
pub use auth::router::auth_router;
mod context;
use axum::{routing::get, Router};
pub use context::Context;
use prisma::init_prisma;
use std::sync::Arc;
use supabase_auth::models::AuthClient;
mod router;
pub use router::mount;
mod profile;
pub use profile::router::profile_router;

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
}
