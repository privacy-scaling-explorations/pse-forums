use crate::{
    dtos::{CreatePostDto, PostDto, UpdatePostDto},
    Context,
};
use domain::{Create, Delete, Read, Update, ValidationError};
use rspc::{Router, RouterBuilder};

pub fn public_post_router() -> RouterBuilder<Context, ()> {
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
            t(|ctx, gid: i32| async move {
                ctx.services
                    .post
                    .list(gid)
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
}

pub fn protected_post_router() -> RouterBuilder<Context, ()> {
    Router::<Context>::new()
        .mutation("create", |t| {
            t(|ctx, dto: CreatePostDto| async move {
                let data = dto.try_into().map_err(|e: ValidationError| {
                    rspc::Error::new(rspc::ErrorCode::BadRequest, e.to_string())
                })?;

                ctx.services
                    .post
                    .create(data)
                    .await
                    .map(PostDto::from)
                    .map_err(|e| {
                        rspc::Error::new(rspc::ErrorCode::InternalServerError, e.to_string())
                    })
            })
        })
        .mutation("update", |t| {
            t(|ctx, dto: UpdatePostDto| async move {
                let data = dto.try_into().map_err(|e: ValidationError| {
                    rspc::Error::new(rspc::ErrorCode::BadRequest, e.to_string())
                })?;
                ctx.services
                    .post
                    .update(data)
                    .await
                    .map(PostDto::from)
                    .map_err(|e| {
                        rspc::Error::new(rspc::ErrorCode::InternalServerError, e.to_string())
                    })
            })
        })
        .mutation("delete", |t| {
            t(|ctx, id: i32| async move {
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
