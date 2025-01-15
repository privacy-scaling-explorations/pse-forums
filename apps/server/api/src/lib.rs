mod auth;
pub use auth::router::auth_router;
mod context;
use axum::{routing::get, Router};
pub use context::Context;
use std::sync::Arc;
mod user;
use prisma::init_prisma;
pub use user::router::user_router;
mod router;
pub use router::mount;

pub async fn app() -> Router {
    let prisma = Arc::new(init_prisma().await.unwrap());
    let router = mount();

    Router::new()
        .route("/", get(|| async { "Hello rspc!" }))
        .nest(
            "/rspc",
            rspc_axum::endpoint(router, move || Context::new(prisma.clone())),
        )
}
