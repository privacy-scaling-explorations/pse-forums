use infra::ProfileRepository;
use prisma::PrismaClient;
use services::{AuthService, ProfileService};
use std::sync::Arc;
use supabase_auth::models::AuthClient;
use tower_cookies::Cookies;

#[derive(Clone)]
pub struct Context {
    pub auth_service: Arc<AuthService>,
    pub cookies: Cookies,
    pub profile_service: Arc<ProfileService>,
}

impl Context {
    pub fn new(prisma: Arc<PrismaClient>, auth_client: Arc<AuthClient>, cookies: Cookies) -> Self {
        let auth_service = Arc::new(AuthService::new(auth_client.clone()));
        let profile_service = Arc::new(ProfileService::new(Arc::new(ProfileRepository::new(
            prisma.clone(),
        ))));
        Self {
            auth_service,
            cookies,
            profile_service,
        }
    }
}
