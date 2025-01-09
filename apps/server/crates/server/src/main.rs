#![deny(clippy::all)]
#![forbid(unsafe_code)]

use axum::serve;
use std::{net::SocketAddr, sync::Arc};
use tokio::net::TcpListener;
use tracing::{error, info};
use tracing_subscriber::EnvFilter;

mod router;

use api::state::AppState;
use domain::service::site_config::SiteConfigService;
use domain::service::user::UserService;
use router::create_app;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    tracing_subscriber::registry()
        .with(EnvFilter::new("info"))
        .with(tracing_subscriber::fmt::layer())
        .init();

    // Initialize services with actual parameters as needed
    let site_config_s = Arc::new(SiteConfigService::new(/* ... */));
    let user_s = Arc::new(UserService::new(/* ... */));

    let state = AppState {
        site_config_s,
        user_s,
    };
    let app = create_app(state);

    let addr: SocketAddr = "127.0.0.1:3000".parse()?;
    let listener = TcpListener::bind(addr).await?;
    info!("listening on http://{}", addr);

    serve(listener, app).await?;
    Ok(())
}
