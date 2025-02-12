mod bandada_admin;
mod comment;
mod email_confirmation;
mod group;
mod post;
mod profile;
mod user;

pub use bandada_admin::*;
pub use comment::*;
use db::PrismaClient;
pub use email_confirmation::*;
pub use group::*;
pub use post::*;
pub use profile::*;
use std::sync::Arc;
pub use user::*;

pub struct Repositories {
    pub bandada_admin: Arc<BandadaAdminRepository>,
    pub comment: Arc<CommentRepository>,
    pub email_confirmation: Arc<EmailConfirmationRepository>,
    pub group: Arc<GroupRepository>,
    pub post: Arc<PostRepository>,
    pub profile: Arc<ProfileRepository>,
    pub user: Arc<UserRepository>,
}

impl Repositories {
    pub fn new(prisma: Arc<PrismaClient>) -> Self {
        Self {
            bandada_admin: Arc::new(BandadaAdminRepository::new(prisma.clone())),
            comment: Arc::new(CommentRepository::new(prisma.clone())),
            email_confirmation: Arc::new(EmailConfirmationRepository::new(prisma.clone())),
            group: Arc::new(GroupRepository::new(prisma.clone())),
            post: Arc::new(PostRepository::new(prisma.clone())),
            profile: Arc::new(ProfileRepository::new(prisma.clone())),
            user: Arc::new(UserRepository::new(prisma.clone())),
        }
    }
}
