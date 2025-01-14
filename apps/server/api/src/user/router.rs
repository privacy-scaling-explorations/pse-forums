use super::dtos::UserResponseDto;
use crate::Context;
use rspc::{Router, RouterBuilder};

pub fn user_router() -> RouterBuilder<Context> {
    Router::<Context>::new().query("read", |t| {
        t(|ctx, user_id: i32| async move {
            ctx.user_service
                .read(user_id)
                .await
                .map(UserResponseDto::from)
                .map_err(|e| rspc::Error::new(rspc::ErrorCode::InternalServerError, e.to_string()))
        })
    })
}
