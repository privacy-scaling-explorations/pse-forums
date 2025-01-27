use db::PrismaClient;
use infra::Repositories;
use services::Services;
use std::sync::Arc;

pub struct Context {
    pub services: Services,
}

impl Context {
    pub fn new(prisma: Arc<PrismaClient>) -> Self {
        Self {
            services: Services::new(Repositories::new(prisma)),
        }
    }
}
