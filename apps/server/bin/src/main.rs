use api::{mount, Context};
use axum::http::Method;
use axum::{routing::get, Router};
use dotenvy::dotenv;
use infra::UserRepository;
use prisma::init_prisma;
use services::UserService;
use std::env;
use std::path::PathBuf;
use std::sync::Arc;
use tokio::net::TcpListener;
use tower_http::cors::{Any, CorsLayer};

#[tokio::main]
async fn main() {
    dotenv().ok();
    let prisma = init_prisma().await.unwrap();
    let user_service = Arc::new(UserService::new(Arc::new(UserRepository::new(prisma))));
    let router = mount();
    let cors = CorsLayer::new()
        .allow_methods([Method::GET, Method::POST])
        .allow_origin(Any);
    let app = Router::new()
        .route("/", get(|| async { "Hello rspc!" }))
        .nest(
            "/rspc",
            rspc_axum::endpoint(router, move || Context {
                user_service: user_service.clone(),
            }),
        )
        .layer(cors);
    let listener = TcpListener::bind("0.0.0.0:3000").await.unwrap();

    println!("Server running on 0.0.0.0:3000");
    axum::serve(listener, app).await.unwrap();
}
