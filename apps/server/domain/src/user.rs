use prisma::user;
use serde::{Deserialize, Serialize};
use specta::Type;

#[derive(Clone, Debug, PartialEq, Eq, Deserialize, Serialize, Type)]
pub struct User {
    pub id: i32,
    pub email: String,
    /// hex encoded hash
    pub pwd: String,
    /// hex encoded
    pub salt: String,
    pub username: String,
}

impl From<user::Data> for User {
    fn from(data: user::Data) -> Self {
        Self {
            id: data.id,
            email: data.email,
            pwd: data.pwd,
            salt: data.salt,
            username: data.username,
        }
    }
}
