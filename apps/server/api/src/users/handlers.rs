use crate::users::dtos::UserResponseDto;
use axum::{
    extract::{Json, Path, State},
    routing::{delete, get, post, put},
    Router,
};
use services::user::UserService;
use std::sync::Arc;

pub fn routes(user_service: Arc<UserService>) -> Router {
    Router::new()
        .route("/hello", get(|| async { "Hello, World!" }))
        .route("/users/{id}", get(get_user))
        .with_state(user_service)
    //    .route("/users", post(create_user))
    // .route(
    //     "/users/:id",
    //     put(move |Json(user): Json<User>| update_user(user, user_service.clone())),
    // )
    // .route(
    //     "/users/:id",
    //     delete(move |Path(id): Path<i32>| delete_user(id, user_service.clone())),
    // )
}

#[axum::debug_handler]
async fn get_user(
    Path(user_id): Path<i32>,
    State(user_service): State<Arc<UserService>>,
) -> Result<Json<UserResponseDto>, String> {
    user_service.get_user(user_id).await.map(|user| {
        Json(UserResponseDto {
            id: user.id,
            username: user.username,
        })
    })
}

// async fn create_user(
//     user: User,
//     user_service: Arc<UserService>,
// ) -> Result<Json<UserResponseDto>, String> {
//     user_service.create_user(user).await.map(|user| {
//         Json(UserResponseDto {
//             id: user.id,
//             username: user.username,
//         })
//     })
// }

// async fn update_user(
//     user: User,
//     user_service: Arc<UserService>,
// ) -> Result<Json<UserResponseDto>, String> {
//     user_service.update_user(user).await.map(|user| {
//         Json(UserResponseDto {
//             id: user.id,
//             username: user.username,
//         })
//     })
// }

// async fn delete_user(user_id: i32, user_service: Arc<UserService>) -> Result<(), String> {
//     user_service.delete_user(user_id).await
// }
