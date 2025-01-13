use rspc::{Router, RouterBuilder};
use services::UserService;

use crate::Context;

use super::dtos::UserResponseDto;

pub fn user_router() -> RouterBuilder<Context> {
    Router::<Context>::new().query("hello", |t| t(|_ctx, _input: ()| async { "Hello, World!" }))
}
