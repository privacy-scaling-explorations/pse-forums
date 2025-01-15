use infra::UserRepository;
use prisma::PrismaClient;
use services::{AuthService, UserService};
use std::sync::Arc;

#[derive(Clone)]
pub struct Context {
    pub auth_service: Arc<AuthService>,
    pub user_service: Arc<UserService>,
}

impl Context {
    pub fn new(prisma: Arc<PrismaClient>) -> Self {
        let user_service = Arc::new(UserService::new(Arc::new(UserRepository::new(
            prisma.clone(),
        ))));
        let auth_service = Arc::new(AuthService::new(user_service.clone()));

        Self {
            auth_service,
            user_service,
        }
    }
}
