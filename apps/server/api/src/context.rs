use infra::{ProfileRepository, UserRepository};
use prisma::PrismaClient;
use services::{ProfileService, UserService};
use std::sync::Arc;

#[derive(Clone)]
pub struct Context {
    pub profile_service: Arc<ProfileService>,
    pub user_service: Arc<UserService>,
}

impl Context {
    pub fn new(prisma: Arc<PrismaClient>) -> Self {
        let profile_service = Arc::new(ProfileService::new(Arc::new(ProfileRepository::new(
            prisma.clone(),
        ))));
        let user_service = Arc::new(UserService::new(Arc::new(UserRepository::new(
            prisma.clone(),
        ))));

        Self {
            profile_service,
            user_service,
        }
    }
}
