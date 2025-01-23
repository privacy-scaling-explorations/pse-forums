use super::dtos::{CommentDto, CreateCommentDto};
use crate::Context;
use domain::{Create, Read};
use rspc::{Router, RouterBuilder};

pub fn comment_router() -> RouterBuilder<Context> {
    Router::<Context>::new()
        .query("read", |t| {
            t(|ctx, id: i32| async move {
                ctx.comment_service
                    .read(id)
                    .await
                    .map(CommentDto::from)
                    // TODO: better error handling
                    .map_err(|e| {
                        rspc::Error::new(rspc::ErrorCode::InternalServerError, e.to_string())
                    })
            })
        })
        .mutation("create", |t| {
            t(|ctx, data: CreateCommentDto| async move {
                ctx.comment_service
                    .create(data.into())
                    .await
                    .map(CommentDto::from)
                    // TODO: better error handling
                    .map_err(|e| {
                        rspc::Error::new(rspc::ErrorCode::InternalServerError, e.to_string())
                    })
            })
        })
        .mutation("delete", |t| {
            t(|_ctx, _id: i32| async move {
                "Disabled, implement authn first"
                // ctx.comment_service
                //     .delete(id)
                //     .await
                //     .map(CommentDto::from)
                //     // TODO: better error handling
                //     .map_err(|e| {
                //         rspc::Error::new(rspc::ErrorCode::InternalServerError, e.to_string())
                //     })
            })
        })
}
