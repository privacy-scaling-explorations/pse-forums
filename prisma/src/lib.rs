mod generated;
pub use generated::*;
use prisma_client_rust::NewClientError;

pub async fn init_prisma() -> Result<PrismaClient, NewClientError> {
    PrismaClient::_builder().build().await
}
