mod generated;
pub use generated::*;
use prisma_client_rust::NewClientError;

pub async fn init_prisma() -> Result<PrismaClient, NewClientError> {
    PrismaClient::_builder()
        //.with_url("postgres://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiMWFiODQxOTUtNWZmNC00MTk3LWFhYTMtNGNiYjQ0NzBhYmNlIiwidGVuYW50X2lkIjoiOTU5MzhkZGM2MDc4N2Y2OWE0NmRmNTMzYTViYWNjMDRjNTBiYjY2N2NlZGQ1YzJjZWM5YjYyODk3YjYwZTliZiIsImludGVybmFsX3NlY3JldCI6ImE4NzQxYTI0LWJjN2QtNDkxNS1iNjQyLTI0ZmU2YjhjZjY2NiJ9.aOzDq36O0lnUnMJbSQKX5oPSwVcCFef3IoFcNRaS-j4".to_string())
        .build()
        .await
}
