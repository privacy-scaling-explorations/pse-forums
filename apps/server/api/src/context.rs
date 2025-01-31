use db::PrismaClient;
use domain::Claim;
use infra::Repositories;
use services::Services;
use std::sync::Arc;

#[derive(Clone)]
pub struct Context {
    pub claim: Option<Claim>,
    pub jwt: Option<String>,
    pub services: Services,
}

impl Context {
    pub fn new(prisma: Arc<PrismaClient>, jwt: Option<String>) -> Self {
        Self {
            claim: None,
            jwt,
            services: Services::new(Repositories::new(prisma)),
        }
    }
}
