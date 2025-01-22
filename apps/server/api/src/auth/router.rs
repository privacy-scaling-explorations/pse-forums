use super::dtos::{SigninRequestDto, SignupRequestDto};
use crate::{user::dtos::UserDto, Context};
use rspc::{Router, RouterBuilder};

pub fn auth_router() -> RouterBuilder<Context> {
    Router::<Context>::new()
        .mutation("signup", |t| {
            t(|ctx, signup_dto: SignupRequestDto| async move {
                ctx.auth_service
                    .signup(signup_dto.into())
                    .await
                    .map(UserDto::from)
                    .map_err(|e| {
                        rspc::Error::new(rspc::ErrorCode::InternalServerError, e.to_string());
                    })
                    .unwrap();
            })
        })
        .query("signin", |t| {
            t(|ctx, signin_dto: SigninRequestDto| async move {
                ctx.auth_service
                    .signin(signin_dto.into())
                    .await
                    .map(UserDto::from)
                    .map_err(|e| {
                        rspc::Error::new(rspc::ErrorCode::InternalServerError, e.to_string())
                    })
                    .unwrap();
            })
        })
}
