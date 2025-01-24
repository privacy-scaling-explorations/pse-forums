use infra::{
    CommentRepository, GroupRepository, PostRepository, ProfileRepository, UserRepository,
};
use prisma::PrismaClient;
use services::{
    AuthService, CommentService, GroupService, PostService, ProfileService, UserService,
};
use std::sync::Arc;

#[derive(Clone)]
pub struct Context {
    pub auth_service: Arc<AuthService>,
    pub comment_service: Arc<CommentService>,
    pub group_service: Arc<GroupService>,
    pub post_service: Arc<PostService>,
    pub profile_service: Arc<ProfileService>,
    pub user_service: Arc<UserService>,
}

impl Context {
    pub fn new(prisma: Arc<PrismaClient>) -> Self {
        let comment_service = Arc::new(CommentService::new(Arc::new(CommentRepository::new(
            prisma.clone(),
        ))));
        let group_service = Arc::new(GroupService::new(Arc::new(GroupRepository::new(
            prisma.clone(),
        ))));
        let post_service = Arc::new(PostService::new(Arc::new(PostRepository::new(
            prisma.clone(),
        ))));
        let profile_service = Arc::new(ProfileService::new(Arc::new(ProfileRepository::new(
            prisma.clone(),
        ))));
        let user_service = Arc::new(UserService::new(Arc::new(UserRepository::new(
            prisma.clone(),
        ))));
        let auth_service = Arc::new(AuthService::new(user_service.clone()));

        Self {
            auth_service,
            comment_service,
            group_service,
            post_service,
            profile_service,
            user_service,
        }
    }
}
