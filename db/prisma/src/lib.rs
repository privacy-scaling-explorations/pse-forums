#[cfg(not(feature = "bin"))]
mod generated;
#[cfg(not(feature = "bin"))]
pub use generated::*;
#[cfg(not(feature = "bin"))]
use prisma_client_rust::NewClientError;

#[cfg(not(feature = "bin"))]
pub async fn init_prisma() -> Result<PrismaClient, NewClientError> {
    PrismaClient::_builder()
        .with_url(std::env::var("DATABASE_URL").unwrap())
        .build()
        .await
}
