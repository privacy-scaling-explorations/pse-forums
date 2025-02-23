use crate::{About, Url, User, Username};
use chrono::{DateTime, FixedOffset};

pub struct Profile {
    pub id: i32,
    pub about: About,
    pub created_at: DateTime<FixedOffset>,
    pub user: Option<User>,
    pub username: Username,
    pub url: Url,
}

impl From<db::profile::Data> for Profile {
    fn from(data: db::profile::Data) -> Self {
        Self {
            id: data.id,
            about: data.about.try_into().unwrap(), // if was inserted successfully in DB it is valid, safe to unwrap
            created_at: data.created_at,
            user: data.user.map(|u| (*u).into()),
            username: data.username.try_into().unwrap(), // if was inserted successfully in DB it is valid, safe to unwrap
            url: data.url.try_into().unwrap(), // if was inserted successfully in DB it is valid, safe to unwrap
        }
    }
}
