use super::dtos::{CommentDto, CreateCommentDto};
use crate::Context;
use domain::{Create, Delete, Read};
use rspc::{Router, RouterBuilder};

pub fn public_comment_router() -> RouterBuilder<Context> {
    Router::<Context>::new()
        .query("read", |t| {
            t(|ctx, id: i32| async move {
                ctx.services
                    .comment
                    .read(id)
                    .await
                    .map(CommentDto::from)
                    // TODO: better error handling
                    .map_err(|e| rspc::Error::new(rspc::ErrorCode::InternalServerError, e.to_string()))
            })
        })
        .query("list", |t| {
            t(|ctx, _: ()| async move {
                ctx.services
                    .comment
                    .read(())
                    .await
                    .map(|comments| {
                        comments
                            .into_iter()
                            .map(CommentDto::from)
                            .collect::<Vec<CommentDto>>()
                    })
                    // TODO: better error handling
                    .map_err(|e| {
                        rspc::Error::new(rspc::ErrorCode::InternalServerError, e.to_string())
                    })
            })
        })
}

pub fn protected_comment_router() -> RouterBuilder<Context> {
    Router::<Context>::new()
        .mutation("create", |t| {
            t(|ctx, data: CreateCommentDto| async move {
                ctx.services
                    .comment
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
            t(|ctx, id: i32| async move {
                // TODO: protect behind authn/authz
                ctx.services
                    .comment
                    .delete(id)
                    .await
                    .map(CommentDto::from)
                    // TODO: better error handling
                    .map_err(|e| {
                        rspc::Error::new(rspc::ErrorCode::InternalServerError, e.to_string())
                    })
            })
        })
}
