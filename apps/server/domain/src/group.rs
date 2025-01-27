use struct_convert::Convert;

#[derive(Convert)]
#[convert(from = "db::group::Data")]
pub struct Group {
    pub id: i32,
    pub name: String,
    pub description: String,
    pub tags: Vec<String>,
}
