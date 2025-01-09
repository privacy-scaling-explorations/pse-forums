use domain::model;
use serde::Serialize;

#[derive(Debug, Serialize)]
pub struct User {
    uid: u32,
    username: String,
    about: String,
    role_desc: String,
    url: String,
    created_at: String,
}

impl From<model::user::User> for User {
    fn from(user: model::user::User) -> Self {
        Self {
            uid: user.uid,
            username: user.username,
            about: user.about,
            role_desc: "todo".into(),
            url: user.url,
            created_at: user.created_at.to_string(),
        }
    }
}
