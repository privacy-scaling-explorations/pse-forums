mod context;
use axum::{http::request::Parts, routing::get, Router};
use context::Context;
use db::init_prisma;
mod dtos;
use std::sync::Arc;
mod routers;
mod rspc;
pub use rspc::mount;

pub async fn app() -> Router {
    let prisma = Arc::new(init_prisma().await.unwrap());
    let router = mount();

    Router::new()
        .route("/", get(|| async { "Hello rspc!" }))
        .nest(
            "/rspc",
            rspc_axum::endpoint(router, move |parts: Parts| {
                let jwt = parts
                    .headers
                    .get("Authorization")
                    .and_then(|v| v.to_str().ok())
                    .and_then(|v| v.strip_prefix("Bearer ").map(String::from));
                Context::new(prisma.clone(), jwt)
            }),
        )
}
