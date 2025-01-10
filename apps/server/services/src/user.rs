use domain::users::model::User;
use infra::users::repository::UserRepository;
use infra::users::traits::{Create, Delete, Read, Update};
use std::sync::Arc;

#[derive(Clone)]
pub struct UserService(Arc<UserRepository>);

impl UserService {
    pub fn new(repo: Arc<UserRepository>) -> Self {
        Self(repo)
    }

    pub async fn get_user(&self, user_id: i32) -> Result<User, String> {
        self.0
            .read(user_id)
            .await
            .map_err(|_| "User not found".into())
    }

    pub async fn create_user(&self, user: User) -> Result<User, String> {
        self.0
            .create(user)
            .await
            .map_err(|_| "Failed to create user".into())
    }

    // pub async fn update_user(&self, user: User) -> Result<User, String> {
    //     self.repo
    //         .update(user)
    //         .await
    //         .map_err(|_| "Failed to update user".into())
    // }

    // pub async fn delete_user(&self, user_id: i32) -> Result<(), String> {
    //     self.repo
    //         .delete(user_id)
    //         .await
    //         .map_err(|_| "Failed to delete user".into())
    // }
}
