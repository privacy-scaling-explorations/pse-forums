use crate::{
    dtos::{CreateGroupDto, GroupDto, UpdateGroupDto},
    Context,
};
use domain::{Create, Delete, Read, Update, ValidationError};
use rspc::{Router, RouterBuilder};

pub fn public_group_router() -> RouterBuilder<Context> {
    Router::<Context>::new()
        .query("read", |t| {
            t(|ctx, id: i32| async move {
                ctx.services
                    .group
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
                ctx.services
                    .group
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
}

pub fn protected_group_router() -> RouterBuilder<Context> {
    Router::<Context>::new()
        .mutation("create", |t| {
            t(|ctx, dto: CreateGroupDto| async move {
                let data = dto
                    .transform(ctx.claim.expect(
                        "Claim should be present, authentication via middleware did not happen",
                    ))
                    .map_err(|e: ValidationError| {
                        rspc::Error::new(rspc::ErrorCode::BadRequest, e.to_string())
                    })?;

                ctx.services
                    .group
                    .create(data)
                    .await
                    .map(GroupDto::from)
                    // TODO: better error handling
                    .map_err(|e| {
                        rspc::Error::new(rspc::ErrorCode::InternalServerError, e.to_string())
                    })
            })
        })
        .mutation("update", |t| {
            t(|ctx, dto: UpdateGroupDto| async move {
                let data = dto.try_into().map_err(|e: ValidationError| {
                    rspc::Error::new(rspc::ErrorCode::BadRequest, e.to_string())
                })?;

                ctx.services
                    .group
                    .update(data)
                    .await
                    .map(GroupDto::from)
                    .map_err(|e| {
                        rspc::Error::new(rspc::ErrorCode::InternalServerError, e.to_string())
                    })
            })
        })
        .mutation("delete", |t| {
            t(|ctx, id: i32| async move {
                ctx.services
                    .group
                    .delete(id)
                    .await
                    .map(GroupDto::from)
                    // TODO: better error handling
                    .map_err(|e| {
                        rspc::Error::new(rspc::ErrorCode::InternalServerError, e.to_string())
                    })
            })
        })
}
