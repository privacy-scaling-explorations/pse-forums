use crate::{content::Content, Comment};
use chrono::{DateTime, FixedOffset};

#[derive(Debug)]
pub struct Post {
    pub id: i32,
    pub comments: Option<Vec<Comment>>,
    pub content: Content,
    pub created_at: DateTime<FixedOffset>,
    pub group: Option<(i32, String)>,
    pub uid: Option<i32>,
    pub title: String,
    pub tags: Vec<String>,
}

impl From<db::post::Data> for Post {
    fn from(data: db::post::Data) -> Self {
        Self {
            id: data.id,
            comments: data
                .comments
                .map(|c| c.into_iter().map(Comment::from).collect()),
            content: data.content.try_into().unwrap(), // if it is in DB, it's already validated
            created_at: data.created_at,
            group: data.group.map(|g| (g.id, g.name)),
            uid: data.uid,
            title: data.title.try_into().unwrap(), // if it is in DB, it's already validated
            tags: data.tags,
        }
    }
}
