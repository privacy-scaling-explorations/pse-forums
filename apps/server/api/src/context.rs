use infra::UserRepository;
use prisma::PrismaClient;
use services::{AuthService, UserService};
use std::sync::Arc;
use supabase_auth::models::AuthClient;

#[derive(Clone)]
pub struct Context {
    pub auth_service: Arc<AuthService>,
    pub user_service: Arc<UserService>,
}

impl Context {
    pub fn new(prisma: Arc<PrismaClient>, auth_client: Arc<AuthClient>) -> Self {
        let user_service = Arc::new(UserService::new(Arc::new(UserRepository::new(
            prisma.clone(),
        ))));
        let auth_service = Arc::new(AuthService::new(auth_client.clone()));

        Self {
            auth_service,
            user_service,
        }
    }
}
