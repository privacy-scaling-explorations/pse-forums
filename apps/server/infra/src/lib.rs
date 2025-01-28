mod comment;
pub use comment::*;
mod error;
use db::PrismaClient;
pub use error::InfraError;
mod group;
pub use group::*;
mod post;
pub use post::*;
mod user;
pub use user::*;
mod profile;
pub use profile::ProfileRepository;
use std::sync::Arc;

pub struct Repositories {
    pub comment: Arc<CommentRepository>,
    pub group: Arc<GroupRepository>,
    pub post: Arc<PostRepository>,
    pub profile: Arc<ProfileRepository>,
    pub user: Arc<UserRepository>,
}

impl Repositories {
    pub fn new(prisma: Arc<PrismaClient>) -> Self {
        Self {
            comment: Arc::new(CommentRepository::new(prisma.clone())),
            group: Arc::new(GroupRepository::new(prisma.clone())),
            post: Arc::new(PostRepository::new(prisma.clone())),
            profile: Arc::new(ProfileRepository::new(prisma.clone())),
            user: Arc::new(UserRepository::new(prisma.clone())),
        }
    }
}
