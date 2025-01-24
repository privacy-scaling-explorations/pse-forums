use super::dtos::{CreateGroupDto, GroupDto};
use crate::Context;
use domain::{Create, Read};
use rspc::{Router, RouterBuilder};

pub fn group_router() -> RouterBuilder<Context> {
    Router::<Context>::new()
        .query("read", |t| {
            t(|ctx, id: i32| async move {
                ctx.group_service
                    .read(id)
                    .await
                    .map(GroupDto::from)
                    // TODO: better error handling
                    .map_err(|e| {
                        rspc::Error::new(rspc::ErrorCode::InternalServerError, e.to_string())
                    })
            })
        })
        .query("list", |t| {
            t(|ctx, _: ()| async move {
                ctx.group_service
                    .read(())
                    .await
                    .map(|groups| {
                        groups
                            .into_iter()
                            .map(GroupDto::from)
                            .collect::<Vec<GroupDto>>()
                    })
                    // TODO: better error handling
                    .map_err(|e| {
                        rspc::Error::new(rspc::ErrorCode::InternalServerError, e.to_string())
                    })
            })
        })
        .mutation("create", |t| {
            t(|ctx, data: CreateGroupDto| async move {
                ctx.group_service
                    .create(data.into())
                    .await
                    .map(GroupDto::from)
                    // TODO: better error handling
                    .map_err(|e| {
                        rspc::Error::new(rspc::ErrorCode::InternalServerError, e.to_string())
                    })
            })
        })
        .mutation("delete", |t| {
            t(|_ctx, _id: i32| async move {
                "Disabled, implement authn first"
                // ctx.group_service
                //     .delete(id)
                //     .await
                //     .map(GroupDto::from)
                //     // TODO: better error handling
                //     .map_err(|e| {
                //         rspc::Error::new(rspc::ErrorCode::InternalServerError, e.to_string())
                //     })
            })
        })
}
