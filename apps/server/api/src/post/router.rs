use super::dtos::{CreatePostDto, PostDto};
use crate::Context;
use domain::{Create, Read};
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
        .query("list", |t| {
            t(|ctx, _: ()| async move {
                ctx.post_service
                    .read(())
                    .await
                    .map(|posts| {
                        posts
                            .into_iter()
                            .map(PostDto::from)
                            .collect::<Vec<PostDto>>()
                    })
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
            t(|_ctx, _id: i32| async move {
                "Disabled, implement authn first"
                // ctx.post_service
                //     .delete(id)
                //     .await
                //     .map(PostDto::from)
                //     // TODO: better error handling
                //     .map_err(|e| {
                //         rspc::Error::new(rspc::ErrorCode::InternalServerError, e.to_string())
                //     })
            })
        })
}
