use super::dtos::UserResponseDto;
use crate::Context;
use domain::Read;
use rspc::{Router, RouterBuilder};

pub fn user_router() -> RouterBuilder<Context> {
    Router::<Context>::new().query("read", |t| t(|ctx, email: String| async move { email }))
}
