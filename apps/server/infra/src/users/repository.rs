use super::traits::{Create, Delete, Read, Update};
use anyhow::Result;
use async_trait::async_trait;
use domain::users::model::User;
use postgrest::Postgrest;

#[derive(Clone)]
pub struct UserRepository(Postgrest);

impl UserRepository {
    pub fn new(base_url: &str) -> Self {
        Self(Postgrest::new(base_url))
    }
}

#[async_trait]
impl Read<User, i32> for UserRepository {
    async fn read(&self, user_id: i32) -> Result<User> {
        let r = self
            .0
            .from("users")
            .eq("id", user_id.to_string())
            .select("*")
            .single()
            .execute()
            .await?
            .text()
            .await?;
        Ok(serde_json::from_str(&r)?)
    }
}

#[async_trait]
impl Create<User> for UserRepository {
    async fn create(&self, user: User) -> Result<User> {
        let r = self
            .0
            .from("users")
            .insert(serde_json::to_string(&user)?)
            .execute()
            .await?
            .text()
            .await?;
        Ok(serde_json::from_str(&r)?)
    }
}

// #[async_trait]
// impl Update<User> for UserRepository {
//     async fn update(&self, user: User) -> Result<User> {
//         self.0
//             .from("users")
//             .eq("id", user.id)
//             .update(&user)
//             .execute()
//             .await?
//             .json()
//             .await
//     }
// }

// #[async_trait]
// impl Delete<i32> for UserRepository {
//     async fn delete(&self, user_id: i32) -> Result<()> {
//         self.0
//             .from("users")
//             .eq("id", user_id)
//             .delete()
//             .execute()
//             .await?;
//         Ok(())
//     }
// }
