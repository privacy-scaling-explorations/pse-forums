use crate::{dtos::UserDto, Context};
use domain::{Delete, Read};
use rspc::{Router, RouterBuilder};
use tracing::error;

pub fn public_user_router() -> RouterBuilder<Context> {
    Router::<Context>::new().query("read", |t| {
        t(|ctx, username: String| async move {
            ctx.services
                .user
                .read(username)
                .await
                .map(UserDto::from)
                .map_err(|e| {
                    error!("user.read service error: {:?}", e);
                    rspc::Error::new(rspc::ErrorCode::InternalServerError, e.to_string())
                })
        })
    })
}

pub fn protected_user_router() -> RouterBuilder<Context> {
    Router::<Context>::new().mutation("delete", |t| {
        t(|ctx, username: String| async move {
            ctx.services
                .user
                .delete(username)
                .await
                .map(UserDto::from)
                .map_err(|e| {
                    error!("user.delete service error: {:?}", e);
                    rspc::Error::new(rspc::ErrorCode::InternalServerError, e.to_string())
                })
        })
    })
}
