mod context;
use axum::{routing::get, Router};
pub use context::Context;
use dotenvy::dotenv;
use std::sync::Arc;
mod user;
use infra::UserRepository;
use prisma::init_prisma;
use services::UserService;
pub use user::router::user_router;
mod router;
pub use router::mount;

pub async fn app() -> Router {
    dotenv().ok();
    let prisma = init_prisma().await.unwrap();
    let user_service = Arc::new(UserService::new(Arc::new(UserRepository::new(prisma))));
    let router = mount();

    Router::new()
        .route("/", get(|| async { "Hello rspc!" }))
        .nest(
            "/rspc",
            rspc_axum::endpoint(router, move || Context {
                user_service: user_service.clone(),
            }),
        )
}
