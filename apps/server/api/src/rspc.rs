use crate::auth::auth_router;
use crate::post::post_router;
use crate::profile::profile_router;
use crate::user::user_router;
use crate::Context;
use rspc::Router;
use std::sync::Arc;

pub fn mount() -> Arc<Router<Context>> {
    Router::<Context>::new()
        .merge("auth.", auth_router())
        .merge("post.", post_router())
        .merge("profile.", profile_router())
        .merge("user.", user_router())
        .build()
        .arced()
}
