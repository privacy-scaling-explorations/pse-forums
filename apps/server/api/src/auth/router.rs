use super::dtos::{SessionDto, SigninRequestDto, SignupRequestDto};
use crate::Context;
use crate::Cookie;
use rspc::{Router, RouterBuilder};

pub fn auth_router() -> RouterBuilder<Context> {
    Router::<Context>::new()
        .mutation("signup", |t| {
            t(|ctx, signup_dto: SignupRequestDto| async move {
                let SessionDto {
                    access_token,
                    refresh_token,
                    ..
                } = ctx
                    .auth_service
                    .signup(signup_dto.into())
                    .await
                    .map(SessionDto::from)
                    .map_err(|e| {
                        rspc::Error::new(rspc::ErrorCode::InternalServerError, e.to_string());
                    })
                    .unwrap();
                let access_token_cookie = Cookie::new("access_token", access_token);
                let refresh_token_cookie = Cookie::new("refresh_token", refresh_token);
                ctx.cookies.add(access_token_cookie.into());
                ctx.cookies.add(refresh_token_cookie.into());
            })
        })
        .query("signin", |t| {
            t(|ctx, signin_dto: SigninRequestDto| async move {
                let SessionDto {
                    access_token,
                    refresh_token,
                    ..
                } = ctx
                    .auth_service
                    .signin(signin_dto.into())
                    .await
                    .map(SessionDto::from)
                    .map_err(|e| {
                        rspc::Error::new(rspc::ErrorCode::InternalServerError, e.to_string())
                    })
                    .unwrap();

                let access_token_cookie = Cookie::new("access_token", access_token);
                let refresh_token_cookie = Cookie::new("refresh_token", refresh_token);
                ctx.cookies.add(access_token_cookie.into());
                ctx.cookies.add(refresh_token_cookie.into());
            })
        })
}
