mod context;
use axum::{routing::get, Router};
pub use context::Context;
use prisma::init_prisma;
use std::sync::Arc;
mod rspc;
pub use rspc::mount;
mod profile;
pub use profile::router::profile_router;
mod user;
pub use user::router::user_router;

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
