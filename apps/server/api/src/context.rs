use infra::ProfileRepository;
use prisma::PrismaClient;
use services::{AuthService, ProfileService};
use std::sync::Arc;
use supabase_auth::models::AuthClient;

#[derive(Clone)]
pub struct Context {
    pub auth_service: Arc<AuthService>,
    pub profile_service: Arc<ProfileService>,
}

impl Context {
    pub fn new(prisma: Arc<PrismaClient>, auth_client: Arc<AuthClient>) -> Self {
        let auth_service = Arc::new(AuthService::new(auth_client.clone()));
        let profile_service = Arc::new(ProfileService::new(Arc::new(ProfileRepository::new(
            prisma.clone(),
        ))));
        Self {
            auth_service,
            profile_service,
        }
    }
}
