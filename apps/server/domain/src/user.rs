use prisma::user;
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct User {
    pub id: i32,
    pub username: String,
    pub email: String,
}

impl From<user::Data> for User {
    fn from(data: user::Data) -> Self {
        Self {
            id: data.id,
            username: data.username,
            email: data.email,
        }
    }
}
