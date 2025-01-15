use super::Result;
use crate::ServiceError;
use async_trait::async_trait;
use derive_more::Constructor;
use domain::User;
use domain::{Create, Read};
use infra::{CreateUser, UserRepository};
use std::sync::Arc;

pub struct CreateUserData {
    pub email: String,
    pub pwd: String,
    pub salt: String,
    pub username: String,
}

impl Into<CreateUser> for CreateUserData {
    fn into(self) -> CreateUser {
        CreateUser {
            email: self.email,
            pwd: self.pwd,
            salt: self.salt,
            username: self.username,
        }
    }
}

#[derive(Clone, Constructor)]
pub struct UserService(Arc<UserRepository>);

#[async_trait]
impl Create<CreateUserData, Result<User>> for UserService {
    async fn create(&self, user: CreateUserData) -> Result<User> {
        self.0.create(user.into()).await.map_err(ServiceError::from)
    }
}

impl UserService {
    pub async fn read(&self, email: String) -> Result<User> {
        self.0.read(email).await.map_err(ServiceError::from)
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::ServiceError;
    use domain::User;
    use infra::InfraError;
    use infra::UserRepository;
    use prisma::user;
    use prisma::PrismaClient;
    use prisma_client_rust::{queries, MockStore};
    use std::sync::Arc;

    async fn setup() -> (Arc<PrismaClient>, MockStore, UserService) {
        let (client, mock) = PrismaClient::_mock();
        let arc_client = Arc::new(client);
        let service = UserService::new(Arc::new(UserRepository::new(arc_client.clone())));
        (arc_client, mock, service)
    }

    #[tokio::test]
    async fn test_service_create_user_success() -> queries::Result<()> {
        let (client, mock, service) = setup().await;
        let new_user_data = CreateUserData {
            email: "test@example.com".to_string(),
            pwd: "hashed_password".to_string(),
            salt: "random_salt".to_string(),
            username: "testuser".to_string(),
        };
        let mock_user_data = user::Data {
            id: 1,
            email: new_user_data.email.clone(),
            pwd: new_user_data.pwd.clone(),
            salt: new_user_data.salt.clone(),
            username: new_user_data.username.clone(),
            // Add other fields if your Prisma schema includes them
        };
        mock.expect(
            client.user().create(
                new_user_data.email.clone(),
                new_user_data.pwd.clone(),
                new_user_data.salt.clone(),
                new_user_data.username.clone(),
                vec![], // Assuming no relations or additional data
            ),
            mock_user_data.clone(),
        )
        .await;
        let expected_user = User::from(mock_user_data);

        let result = service.create(new_user_data).await.unwrap();

        assert_eq!(result, expected_user);
        Ok(())
    }

    #[tokio::test]
    async fn test_service_read_user_success() -> queries::Result<()> {
        let (client, mock, service) = setup().await;
        let email = "existing_user@example.com".to_string();
        let mock_user_data = user::Data {
            id: 2,
            email: email.clone(),
            pwd: "existing_hashed_pwd".to_string(),
            salt: "existing_salt".to_string(),
            username: "existinguser".to_string(),
        };
        mock.expect(
            client
                .user()
                .find_unique(user::email::equals(email.clone())),
            Some(mock_user_data.clone()),
        )
        .await;
        let expected_user = User::from(mock_user_data);

        let result = service.read(email.clone()).await.unwrap();

        assert_eq!(result, expected_user);
        Ok(())
    }

    #[tokio::test]
    async fn test_service_read_user_not_found() -> queries::Result<()> {
        let (client, mock, service) = setup().await;
        let email = "nonexistent_user@example.com".to_string();
        mock.expect(
            client
                .user()
                .find_unique(user::email::equals(email.clone())),
            None, // Simulate no user found
        )
        .await;

        let result = service.read(email.clone()).await;

        match result {
            Err(ServiceError::Infra(InfraError::NotFound)) => { /* Test passes */ }
            _ => panic!("Expected ServiceError::Infra(InfraError::NotFound)"),
        }

        Ok(())
    }
}
