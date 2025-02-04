use tokio::net::TcpListener;
use tower_http::cors::CorsLayer;

#[tokio::main]
async fn main() {
    // TODO: define more restrictive CORS policy https://github.com/privacy-scaling-explorations/pse-forums/issues/21
    let app = api::app().await.layer(CorsLayer::very_permissive());
    // TODO: read port from env
    let listener = TcpListener::bind("0.0.0.0:3000").await.unwrap();

    println!("Server running on 0.0.0.0:3000");
    axum::serve(listener, app).await.unwrap();
}
