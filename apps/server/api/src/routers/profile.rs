use crate::{
    dtos::{ProfileDto, UpdateProfileDto},
    Context,
};
use domain::{Read, Update, ValidationError};
use rspc::{Router, RouterBuilder};

pub fn public_profile_router() -> RouterBuilder<Context> {
    Router::<Context>::new()
        .query("read", |t| {
            t(|ctx, username: String| async move {
                ctx.services
                    .profile
                    .read(username)
                    .await
                    .map(ProfileDto::from)
                    // TODO: better error handling
                    .map_err(|e| {
                        rspc::Error::new(rspc::ErrorCode::InternalServerError, e.to_string())
                    })
            })
        })
        .query("list", |t| {
            t(|ctx, _: ()| async move {
                ctx.services
                    .profile
                    .read(())
                    .await
                    .map(|profiles| {
                        profiles
                            .into_iter()
                            .map(ProfileDto::from)
                            .collect::<Vec<ProfileDto>>()
                    })
                    // TODO: better error handling
                    .map_err(|e| {
                        rspc::Error::new(rspc::ErrorCode::InternalServerError, e.to_string())
                    })
            })
        })
}

pub fn protected_profile_router() -> RouterBuilder<Context> {
    Router::<Context>::new().mutation("update", |t| {
        t(|ctx, dto: UpdateProfileDto| async move {
            let data = dto.try_into().map_err(|e: ValidationError| {
                rspc::Error::new(rspc::ErrorCode::BadRequest, e.to_string())
            })?;

            ctx.services
                .profile
                .update(data)
                .await
                .map(ProfileDto::from)
                .map_err(|e| rspc::Error::new(rspc::ErrorCode::InternalServerError, e.to_string()))
        })
    })
}
