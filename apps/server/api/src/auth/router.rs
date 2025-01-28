use super::dtos::{AuthResponseDto, SigninRequestDto, SignupRequestDto};
use crate::Context;
use rspc::{Router, RouterBuilder};

pub fn auth_router() -> RouterBuilder<Context> {
    Router::<Context>::new()
        .mutation("signup", |t| {
            t(|ctx, signup_dto: SignupRequestDto| async move {
                ctx.services
                    .auth
                    .signup(signup_dto.into())
                    .await
                    .map(|(user, token)| AuthResponseDto {
                        user: user.into(),
                        token,
                    })
                    .map_err(|e| {
                        rspc::Error::new(rspc::ErrorCode::InternalServerError, e.to_string())
                    })
            })
        })
        .mutation("signin", |t| {
            t(|ctx, signin_dto: SigninRequestDto| async move {
                ctx.services
                    .auth
                    .signin(signin_dto.into())
                    .await
                    .map(|(user, token)| AuthResponseDto {
                        user: user.into(),
                        token,
                    })
                    .map_err(|e| {
                        rspc::Error::new(rspc::ErrorCode::InternalServerError, e.to_string())
                    })
            })
        })
}
