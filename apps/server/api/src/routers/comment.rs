use crate::dtos::{CommentDto, CreateCommentDto, UpdateCommentDto};
use crate::Context;
use anyhow::Error;
use domain::{Create, Delete, Read, Update};
use rspc::{Router, RouterBuilder};
use tracing::error;

pub fn public_comment_router() -> RouterBuilder<Context> {
    Router::<Context>::new()
        .query("read", |t| {
            t(|ctx, id: i32| async move {
                ctx.services
                    .comment
                    .read(id)
                    .await
                    .map(CommentDto::from)
                    .map_err(|e| {
                        error!("comment.read service error: {:?}", e);
                        rspc::Error::new(rspc::ErrorCode::InternalServerError, e.to_string())
                    })
            })
        })
        .query("list", |t| {
            t(|ctx, pid: i32| async move {
                ctx.services
                    .comment
                    .list(pid)
                    .await
                    .map(|comments| {
                        comments
                            .into_iter()
                            .map(CommentDto::from)
                            .collect::<Vec<CommentDto>>()
                    })
                    .map_err(|e| {
                        error!("comment.list service error: {:?}", e);
                        rspc::Error::new(rspc::ErrorCode::InternalServerError, e.to_string())
                    })
            })
        })
}

pub fn protected_comment_router() -> RouterBuilder<Context> {
    Router::<Context>::new()
        .mutation("create", |t| {
            t(|ctx, dto: CreateCommentDto| async move {
                let data = dto.try_into().map_err(|e: Error| {
                    error!("Comment creation request validation failed: {:?}", e);
                    rspc::Error::new(rspc::ErrorCode::BadRequest, e.to_string())
                })?;

                ctx.services
                    .comment
                    .create(data)
                    .await
                    .map(CommentDto::from)
                    .map_err(|e| {
                        error!("comment.create service error: {:?}", e);
                        rspc::Error::new(rspc::ErrorCode::InternalServerError, e.to_string())
                    })
            })
        })
        .mutation("update", |t| {
            t(|ctx, dto: UpdateCommentDto| async move {
                let data = dto.try_into().map_err(|e: Error| {
                    error!("Comment update request validation failed: {:?}", e);
                    rspc::Error::new(rspc::ErrorCode::BadRequest, e.to_string())
                })?;
                ctx.services
                    .comment
                    .update(data)
                    .await
                    .map(CommentDto::from)
                    .map_err(|e| {
                        rspc::Error::new(rspc::ErrorCode::InternalServerError, e.to_string())
                    })
            })
        })
        .mutation("delete", |t| {
            t(|ctx, id: i32| async move {
                ctx.services
                    .comment
                    .delete(id)
                    .await
                    .map(CommentDto::from)
                    .map_err(|e| {
                        error!("comment.delete service error: {:?}", e);
                        rspc::Error::new(rspc::ErrorCode::InternalServerError, e.to_string())
                    })
            })
        })
}
