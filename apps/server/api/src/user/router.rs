use super::dtos::UserDto;
use crate::Context;
use domain::Read;
use rspc::{Router, RouterBuilder};

pub fn user_router() -> RouterBuilder<Context> {
    Router::<Context>::new()
        .query("read", |t| {
            t(|ctx, username: String| async move {
                ctx.user_service
                    .read(username)
                    .await
                    .map(UserDto::from)
                    // TODO: better error handling
                    .map_err(|e| {
                        rspc::Error::new(rspc::ErrorCode::InternalServerError, e.to_string())
                    })
            })
        })
        .mutation("delete", |t| {
            t(|_ctx, _username: String| async move {
                "Disabled, implement authn first"
                // TODO: protect behind authn
                // ctx.user_service
                //     .delete(username)
                //     .await
                //     .map(UserDto::from)
                //     // TODO: better error handling
                //     .map_err(|e| {
                //         rspc::Error::new(rspc::ErrorCode::InternalServerError, e.to_string())
                //     })
            })
        })
}
