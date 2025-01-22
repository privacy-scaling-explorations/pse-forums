use super::dtos::{CreatePostDto, PostDto};
use crate::Context;
use domain::{Create, Delete, Read};
use rspc::{Router, RouterBuilder};

pub fn post_router() -> RouterBuilder<Context> {
    Router::<Context>::new()
        .query("read", |t| {
            t(|ctx, id: i32| async move {
                ctx.post_service
                    .read(id)
                    .await
                    .map(PostDto::from)
                    // TODO: better error handling
                    .map_err(|e| {
                        rspc::Error::new(rspc::ErrorCode::InternalServerError, e.to_string())
                    })
            })
        })
        .mutation("create", |t| {
            t(|ctx, data: CreatePostDto| async move {
                ctx.post_service
                    .create(data.into())
                    .await
                    .map(PostDto::from)
                    // TODO: better error handling
                    .map_err(|e| {
                        rspc::Error::new(rspc::ErrorCode::InternalServerError, e.to_string())
                    })
            })
        })
        .mutation("delete", |t| {
            t(|ctx, idta: i32| async move {
                ctx.post_service
                    .delete(idta)
                    .await
                    .map(PostDto::from)
                    // TODO: better error handling
                    .map_err(|e| {
                        rspc::Error::new(rspc::ErrorCode::InternalServerError, e.to_string())
                    })
            })
        })
}
