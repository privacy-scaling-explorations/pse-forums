use domain::Group;
use serde::{Deserialize, Serialize};
use services::CreateGroupData;
use specta::Type;
use struct_convert::Convert;

#[derive(Convert, Deserialize, Type)]
#[convert(into = "CreateGroupData")]
pub struct CreateGroupDto {
    pub name: String,
    pub description: String,
    pub tags: Option<Vec<String>>,
}

#[derive(Convert, Serialize, Type)]
#[convert(from = "Group")]
pub struct GroupDto {
    pub id: i32,
    pub name: String,
    pub description: String,
    pub tags: Vec<String>,
}
