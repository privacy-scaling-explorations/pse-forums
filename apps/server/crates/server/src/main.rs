#![deny(clippy::all)]
#![forbid(unsafe_code)]

use std::{net::SocketAddr, sync::Arc};

use hyper::Server;
use tracing::{error, info};
use tracing_subscriber::EnvFilter;

mod router;

use api::AppState;
use domain::service::site_config::SiteConfigService;
use domain::service::user::UserService;
use router::create_app;

#[tokio::main]
async fn main() {
    tracing_subscriber::fmt()
        .with_env_filter(EnvFilter::new("info"))
        .init();

    // Initialize services (adjust initialization as needed)
    let site_config_s = Arc::new(SiteConfigService::new(/* ... */));
    let user_s = Arc::new(UserService::new(/* ... */));

    let state = AppState {
        site_config_s,
        user_s,
    };
    let app = create_app(state);

    let addr = SocketAddr::from(([127, 0, 0, 1], 3000));
    info!("Server listening on {}", addr);

    if let Err(e) = Server::bind(&addr).serve(app.into_make_service()).await {
        error!("server error: {}", e);
    }
}
