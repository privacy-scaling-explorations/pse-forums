use serde::Deserialize;
use specta::Type;

#[derive(Deserialize, Type)]
pub struct Group {
    pub id: i32,
    pub name: String,
    pub description: String,
    pub tags: Vec<String>,
}

impl From<prisma::group::Data> for Group {
    fn from(data: prisma::group::Data) -> Self {
        Self {
            id: data.id,
            name: data.name,
            description: data.description,
            tags: data.tags,
        }
    }
}
