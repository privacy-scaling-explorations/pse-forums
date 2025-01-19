use serde::Serialize;
use specta::Type;

#[derive(Serialize, Type)]
pub struct ProfileDto {
    pub id: String,
    pub username: String,
}

impl From<prisma::profile::Data> for ProfileDto {
    fn from(data: prisma::profile::Data) -> Self {
        Self {
            id: data.id,
            username: data.username,
        }
    }
}
