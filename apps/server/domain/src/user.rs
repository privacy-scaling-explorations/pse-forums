use prisma::user;
use serde::{Deserialize, Serialize};
use specta::Type;

#[derive(Clone, Debug, PartialEq, Eq, Deserialize, Serialize, Type)]
pub struct User {
    pub id: String,
    pub username: String,
}

impl From<user::Data> for User {
    fn from(data: user::Data) -> Self {
        Self {
            id: "1".to_string(),
            username: data.username,
        }
    }
}
