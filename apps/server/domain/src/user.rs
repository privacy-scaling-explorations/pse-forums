use serde::{Deserialize, Serialize};
use specta::Type;

#[derive(Clone, Debug, PartialEq, Eq, Deserialize, Serialize, Type)]
pub struct User {
    pub id: String,
    pub username: String,
}
