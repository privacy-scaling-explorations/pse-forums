mod generated;
pub use generated::*;
use prisma_client_rust::NewClientError;

pub async fn init_prisma() -> Result<PrismaClient, NewClientError> {
    PrismaClient::_builder()
        .with_url(std::env::var("DATABASE_URL").unwrap())
        .build()
        .await
}
