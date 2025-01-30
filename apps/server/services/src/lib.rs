use std::sync::Arc;
mod auth;
pub use auth::*;
mod comment;
pub use comment::*;
mod error;
pub use error::*;
mod group;
pub use group::*;
mod post;
use infra::Repositories;
pub use post::*;
mod profile;
pub use profile::*;
mod user;
pub use user::*;

#[derive(Clone)]
pub struct Services {
    pub auth: Arc<AuthService>,
    pub comment: Arc<CommentService>,
    pub group: Arc<GroupService>,
    pub post: Arc<PostService>,
    pub profile: Arc<ProfileService>,
    pub user: Arc<UserService>,
}

impl Services {
    pub fn new(repositories: Repositories) -> Self {
        let group_service = Arc::new(GroupService::new(repositories.group));
        let user_service = Arc::new(UserService::new(repositories.user));

        Self {
            auth: Arc::new(AuthService::new(
                user_service.clone(),
                std::env::var("JWT_SECRET").expect("JWT_SECRET is not set"),
            )),
            comment: Arc::new(CommentService::new(repositories.comment)),
            group: group_service.clone(),
            post: Arc::new(PostService::new(repositories.post, group_service)),
            profile: Arc::new(ProfileService::new(repositories.profile)),
            user: user_service,
        }
    }
}
