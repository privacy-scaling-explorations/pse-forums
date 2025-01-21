use super::dtos::{SessionDto, SigninRequestDto, SignupRequestDto};
use crate::Context;
use rspc::{Router, RouterBuilder};

pub fn auth_router() -> RouterBuilder<Context> {
    Router::<Context>::new()
        .mutation("signup", |t| {
            t(|ctx, signup_dto: SignupRequestDto| async move {
                ctx.auth_service
                    .signup(signup_dto.into())
                    .await
                    .map(SessionDto::from)
                    .map_err(|e| {
                        rspc::Error::new(rspc::ErrorCode::InternalServerError, e.to_string())
                    })
            })
        })
        .query("signin", |t| {
            t(|ctx, signin_dto: SigninRequestDto| async move {
                ctx.auth_service
                    .signin(signin_dto.into())
                    .await
                    .map(SessionDto::from)
                    .map_err(|e| {
                        rspc::Error::new(rspc::ErrorCode::InternalServerError, e.to_string())
                    })
            })
        })
}
