use super::dtos::UserDto;
use crate::Context;
use domain::{Delete, Read};
use rspc::{Router, RouterBuilder};

pub fn user_router() -> RouterBuilder<Context> {
    Router::<Context>::new()
        .query("read", |t| {
            t(|ctx, username: String| async move {
                ctx.services
                    .user
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
            t(|ctx, username: String| async move {
                // TODO: protect behind authn
                ctx.services
                    .user
                    .delete(username)
                    .await
                    .map(UserDto::from)
                    // TODO: better error handling
                    .map_err(|e| {
                        rspc::Error::new(rspc::ErrorCode::InternalServerError, e.to_string())
                    })
            })
        })
}
