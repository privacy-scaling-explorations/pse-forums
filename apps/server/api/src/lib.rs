mod auth;
mod comment;
mod context;
use axum::{routing::get, Router};
use context::Context;
mod group;
use db::init_prisma;
use std::sync::Arc;
mod post;
mod profile;
mod rspc;
pub use rspc::mount;
mod user;

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
