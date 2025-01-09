use crate::error::DomainError;
use crate::model::user::{User, UserRepository};
use std::sync::Arc;

pub struct UserService(Arc<dyn UserRepository>);

impl UserService {
    pub fn new(user_repository: Arc<dyn UserRepository>) -> Self {
        Self(user_repository)
    }

    pub async fn find(&self, id: &str) -> Result<Option<User>, DomainError> {
        let user = if let Ok(uid) = id.parse::<u32>() {
            self.0.find_by_id(uid).await?
        } else {
            self.0.find_by_username(id).await?
        };
        if user.is_none() {
            return Ok(None);
        }
        let user = user.unwrap();

        // TODO: implement user_followers model, repository and service
        let mut user_solos_count = 0;

        // TODO: implement solo model, repository and service

        let mut user_posts_count = 0;
        // TODO: implement post model, repository and service

        let mut user_feeds_count = 0;
        // TODO: implement feed model, repository and service

        let mut user_following_count = 0;
        //  TODO: implement user_following model, repository and service
        // TODO: implement user_followers model, repository and service

        let mut has_recovery_code = true;
        let has_followed = false; // TODO

        let title = format!("{}-{}", user.username, user.uid);
        let has_unread = false; // TODO

        Ok(Some(user))
    }
}
