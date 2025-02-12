pub fn too_long(max_len: usize) -> String {
    format!("Too long (max {} chars)", max_len)
}

pub fn too_short(min_len: usize) -> String {
    format!("Too short (min {} chars)", min_len)
}
