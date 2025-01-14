use crate::Context;
use crate::{user::dtos::UserResponseDto, user_router};
use domain::Read;
use rspc::{Config, Router};
use std::{path::PathBuf, sync::Arc};

pub fn mount() -> Arc<Router<Context>> {
    Router::<Context>::new()
        .config(Config::new().export_ts_bindings(
            PathBuf::from(env!("CARGO_MANIFEST_DIR")).join("../../client/src/lib/bindings.ts"),
        ))
        .merge("users.", user_router())
        .build()
        .arced()
}
