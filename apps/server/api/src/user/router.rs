use super::dtos::UserDto;
use crate::Context;
use domain::Read;
use rspc::{Router, RouterBuilder};

pub fn user_router() -> RouterBuilder<Context> {
    Router::<Context>::new().query("read", |t| {
        t(|ctx, id: i32| async move {
            ctx.user_service
                .read(id)
                .await
                .map(UserDto::from)
                // TODO: better error handling
                .map_err(|e| rspc::Error::new(rspc::ErrorCode::InternalServerError, e.to_string()))
        })
    })
}
