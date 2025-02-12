use anyhow::{Context, Result};
use std::env;
use std::process;
use tokio::net::TcpListener;
use tower_http::cors::CorsLayer;
use tracing::info;
use tracing_subscriber::{fmt, layer::SubscriberExt, util::SubscriberInitExt};
use url::Url;

#[tokio::main]
async fn main() -> Result<()> {
    let (loki_layer, loki_task) = tracing_loki::builder()
        .label("host", "pse-forum-server")? // Add a label to distinguish logs
        .extra_field("pid", format!("{}", process::id()))? // Include process ID
        .build_url(Url::parse(&env::var("LOKI_URL").unwrap()).unwrap())?;
    tracing_subscriber::registry()
        .with(fmt::layer()) // log to stdout
        .with(loki_layer) // send logs to loki
        .init();

    info!("Starting loki task");
    tokio::spawn(loki_task);
    info!("Starting server");

    // TODO: define more restrictive CORS policy https://github.com/privacy-scaling-explorations/pse-forums/issues/21
    let app = api::app().await.layer(CorsLayer::very_permissive());
    // TODO: read port from env
    let listener = TcpListener::bind("0.0.0.0:3000")
        .await
        .context("Failed to bind to port")?;

    info!("Server running on 0.0.0.0:3000");
    axum::serve(listener, app)
        .await
        .context("Failed to serve")?;

    Ok(())
}
