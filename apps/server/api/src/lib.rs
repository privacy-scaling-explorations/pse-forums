mod context;
use axum::{http::request::Parts, routing::get, Router};
use context::Context;
use db::init_prisma;
use routers::confirm_email_handler;
mod dtos;
use std::sync::Arc;
mod routers;
mod rspc;
pub use rspc::mount;

pub async fn app() -> Router {
    let prisma = Arc::new(init_prisma().await.unwrap());
    let router = mount();
    let context = Context::new(prisma.clone(), None);
    Router::new()
        .route("/", get(|| async { "Hello rspc!" }))
        .route("/auth/confirm/email", get(confirm_email_handler))
        .with_state(context.services.auth.clone())
        .nest(
            "/rspc",
            rspc_axum::endpoint(router, move |parts: Parts| {
                let jwt = parts
                    .headers
                    .get("Authorization")
                    .and_then(|v| v.to_str().ok())
                    .and_then(|v| v.strip_prefix("Bearer ").map(String::from));
                let context = context.clone();
                Context { jwt, ..context }
            }),
        )
}
