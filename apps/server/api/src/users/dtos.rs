use serde::Serialize;

#[derive(Serialize)]
pub struct UserResponseDto {
    pub id: i32,
    pub username: String,
}
