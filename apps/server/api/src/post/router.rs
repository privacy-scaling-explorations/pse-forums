use super::dtos::{CreatePostDto, PostDto};
use crate::Context;
use domain::{Create, Delete, Read};
use rspc::{Router, RouterBuilder};

pub fn post_router() -> RouterBuilder<Context> {
    Router::<Context>::new()
        .query("read", |t| {
            t(|ctx, id: i32| async move {
                ctx.services
                    .post
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
                ctx.services
                    .post
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
                ctx.services
                    .post
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
            t(|ctx, id: i32| async move {
                // TODO: protect behind authn/authz
                ctx.services
                    .post
                    .delete(id)
                    .await
                    .map(PostDto::from)
                    // TODO: better error handling
                    .map_err(|e| {
                        rspc::Error::new(rspc::ErrorCode::InternalServerError, e.to_string())
                    })
            })
        })
}
