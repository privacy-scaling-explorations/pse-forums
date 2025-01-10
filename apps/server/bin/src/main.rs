use axum::{routing::get, Router};
use dotenvy::dotenv;
use infra::users::repository::UserRepository;
use services::user::UserService;
use std::env;
use std::sync::Arc;

#[tokio::main]
async fn main() {
    dotenv().ok();
    let base_url = env::var("SUPABASE_URL").expect("SUPABASE_URL must be set");
    let user_service = Arc::new(UserService::new(Arc::new(UserRepository::new(&base_url))));

    let app = Router::new().merge(api::users::handlers::routes(user_service));

    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await.unwrap();
    println!("Listening on http://0.0.0.0:3000");
    axum::serve(listener, app).await.unwrap();
}
