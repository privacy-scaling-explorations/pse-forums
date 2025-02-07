use crate::{title::Name, Description, Post};

pub struct Group {
    pub aid: i32,
    pub anonymous: bool,
    pub description: Description,
    pub id: i32,
    pub name: Name,
    pub posts: Option<Vec<Post>>,
    pub tags: Vec<String>,
}

impl From<db::group::Data> for Group {
    fn from(data: db::group::Data) -> Self {
        Self {
            aid: data.aid,
            anonymous: data.anonymous,
            description: data.description.try_into().unwrap(), // if it is in DB, it's already validated
            id: data.id,
            name: data.name.try_into().unwrap(), // if it is in DB, it's already validated
            posts: data.posts.map(|p| p.into_iter().map(Post::from).collect()),
            tags: data.tags,
        }
    }
}
