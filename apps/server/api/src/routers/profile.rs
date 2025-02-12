use crate::{
    dtos::{ProfileDto, UpdateProfileReqDto, UpdateProfileResDto},
    Context,
};
use anyhow::Error;
use domain::{Read, Update};
use rspc::{Router, RouterBuilder};
use tracing::error;

pub fn public_profile_router() -> RouterBuilder<Context> {
    Router::<Context>::new()
        .query("read", |t| {
            t(|ctx, username: String| async move {
                ctx.services
                    .profile
                    .read(username)
                    .await
                    .map(ProfileDto::from)
                    .map_err(|e| {
                        error!("profile.read service error: {:?}", e);
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
                    .map_err(|e| {
                        error!("profile.list service error: {:?}", e);
                        rspc::Error::new(rspc::ErrorCode::InternalServerError, e.to_string())
                    })
            })
        })
}

pub fn protected_profile_router() -> RouterBuilder<Context> {
    Router::<Context>::new().mutation("update", |t| {
        t(|ctx, dto: UpdateProfileReqDto| async move {
            let data = dto.try_into().map_err(|e: Error| {
                error!("Update profile request validation failed: {:?}", e);
                rspc::Error::new(rspc::ErrorCode::BadRequest, e.to_string())
            })?;

            ctx.services
                .profile
                .update(data)
                .await
                .map(|(profile, jwt)| UpdateProfileResDto {
                    jwt,
                    profile: ProfileDto::from(profile),
                })
                .map_err(|e| {
                    error!("profile.update service error: {:?}", e);
                    rspc::Error::new(rspc::ErrorCode::InternalServerError, e.to_string())
                })
        })
    })
}
