//use crate::auth_router;
use crate::user_router;
use crate::Context;
use rspc::Router;
use std::sync::Arc;

pub fn mount() -> Arc<Router<Context>> {
    Router::<Context>::new()
        .merge("users.", user_router())
        //      .merge("auth.", auth_router())
        .build()
        .arced()
}
