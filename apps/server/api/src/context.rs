use prisma::PrismaClient;
use services::AuthService;
use std::sync::Arc;
use supabase_auth::models::AuthClient;

#[derive(Clone)]
pub struct Context {
    pub auth_service: Arc<AuthService>,
}

impl Context {
    pub fn new(prisma: Arc<PrismaClient>, auth_client: Arc<AuthClient>) -> Self {
        let auth_service = Arc::new(AuthService::new(auth_client.clone()));

        Self { auth_service }
    }
}
