use std::sync::Arc;

use crate::{user_router, Context};
use rspc::Router;

pub fn mount() -> Arc<Router<Context>> {
    Router::<Context>::new()
        .merge("users.", user_router())
        .build()
        .arced()
}
