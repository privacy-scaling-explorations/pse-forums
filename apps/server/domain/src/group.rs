use crate::{title::Name, Description};

pub struct Group {
    pub id: i32,
    pub name: Name,
    pub description: Description,
    pub tags: Vec<String>,
}

impl From<db::group::Data> for Group {
    fn from(data: db::group::Data) -> Self {
        Self {
            id: data.id,
            name: data.name.try_into().unwrap(), // if it is in DB, it's already validated
            description: data.description.try_into().unwrap(), // if it is in DB, it's already validated
            tags: data.tags,
        }
    }
}
