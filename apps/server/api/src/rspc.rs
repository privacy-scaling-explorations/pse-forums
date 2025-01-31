use crate::{routers::*, Context};
use rspc::Router;
use std::sync::Arc;

pub fn mount() -> Arc<Router<Context>> {
    Router::<Context>::new()
        .merge("auth.", auth_router())
        .merge("comment.", public_comment_router())
        .merge("group.", public_group_router())
        .merge("post.", public_post_router())
        .merge("profile.", public_profile_router())
        .merge("user.", public_user_router())
        .middleware(|mw| {
            // TODO: extract in separate fn/module?
            mw.middleware(|mw| async move {
                let services = mw.ctx.services.clone();
                let jwt = mw.ctx.jwt.clone();

                if let Some(token) = jwt {
                    match mw.ctx.services.auth.validate_jwt(&token) {
                        Ok(claim) => Ok(mw.with_ctx(Context {
                            claim: Some(claim),
                            jwt: Some(token.clone()),
                            services,
                        })),
                        Err(err) => Err(rspc::Error::new(
                            rspc::ErrorCode::Unauthorized,
                            err.to_string(),
                        )),
                    }
                } else {
                    Err(rspc::Error::new(
                        rspc::ErrorCode::Unauthorized,
                        "No Bearer token provided".to_string(),
                    ))
                }
            })
        })
        .merge("comment.", protected_comment_router())
        .merge("group.", protected_group_router())
        .merge("post.", protected_post_router())
        .merge("profile.", protected_profile_router())
        .merge("user.", protected_user_router())
        .build()
        .arced()
}
