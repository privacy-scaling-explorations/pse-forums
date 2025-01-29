use crate::{
    dtos::{AuthResponseDto, SigninRequestDto, SignupRequestDto},
    Context,
};
use rspc::{Router, RouterBuilder};
use services::SignupData;

pub fn auth_router() -> RouterBuilder<Context> {
    Router::<Context>::new()
        .mutation("signup", |t| {
            t(|ctx, signup_dto: SignupRequestDto| async move {
                let signup_data = signup_dto.try_into().map_err(|e: String| {
                    rspc::Error::new(rspc::ErrorCode::BadRequest, e.to_string())
                })?;

                ctx.services
                    .auth
                    .signup(signup_data)
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
