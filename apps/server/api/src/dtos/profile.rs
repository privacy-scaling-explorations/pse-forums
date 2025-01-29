use domain::Profile;
use serde::Serialize;
use specta::Type;
use struct_convert::Convert;

#[derive(Convert, Serialize, Type)]
#[convert(from = "Profile")]
pub struct ProfileDto {
    pub id: i32,
    pub about: Option<String>,
    #[convert_field(to_string)]
    pub created_at: String,
    pub username: String,
    pub url: Option<String>,
}
