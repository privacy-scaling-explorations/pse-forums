use super::dtos::{SigninRequestDto, SignupRequestDto};
use crate::Context;
use rspc::{Router, RouterBuilder};

pub fn auth_router() -> RouterBuilder<Context> {
    Router::<Context>::new()
        .mutation("signup", |t| {
            t(|ctx, signup_request: SignupRequestDto| async move {
                ctx.auth_service
                    .signup(signup_request.into())
                    .await
                    .map_err(|e| {
                        rspc::Error::new(rspc::ErrorCode::InternalServerError, e.to_string())
                    })
            })
        })
        .query("signin", |t| {
            t(|ctx, signin_request: SigninRequestDto| async move {
                ctx.auth_service
                    .signin(signin_request.into())
                    .await
                    .map_err(|e| {
                        println!("{e}");
                        rspc::Error::new(rspc::ErrorCode::InternalServerError, e.to_string())
                    })
            })
        })
}
