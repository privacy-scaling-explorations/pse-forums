use bandada::http_client::HttpClient;
use lettre::{transport::smtp::authentication::Credentials, SmtpTransport};
use std::env;
use std::sync::Arc;

mod auth;
mod bandada;
mod comment;
mod email_confirmation;
mod group;
mod post;
use infra::Repositories;
mod profile;
mod user;

pub use auth::*;
pub use bandada::service::*;
pub use comment::*;
pub use email_confirmation::*;
pub use group::*;
pub use post::*;
pub use profile::*;
pub use user::*;

#[derive(Clone)]
pub struct Services {
    pub auth: Arc<AuthService>,
    pub bandada: Arc<BandadaService>,
    pub comment: Arc<CommentService>,
    pub group: Arc<GroupService>,
    pub post: Arc<PostService>,
    pub profile: Arc<ProfileService>,
    pub user: Arc<UserService>,
}

impl Services {
    pub fn new(repositories: Repositories) -> Self {
        let smtp_host = env::var("EMAIL_HOST").expect("EMAIL_HOST is not set");
        let smtp_port = env::var("EMAIL_PORT")
            .expect("EMAIL_PORT is not set")
            .parse::<u16>()
            .expect("EMAIL_PORT must be a valid number");

        let emailer = if env::var("USE_INBUCKET").is_ok() {
            // Inbucket doesn't require authentication
            SmtpTransport::builder_dangerous(&smtp_host)
                .port(smtp_port)
                .build()
        } else {
            // Use production SMTP server with authentication
            let creds = Credentials::new(
                env::var("EMAIL_USERNAME").expect("EMAIL_USERNAME is not set"),
                env::var("EMAIL_PASSWORD").expect("EMAIL_PASSWORD is not set"),
            );
            SmtpTransport::relay(&smtp_host)
                .expect("Failed to connect to email relay")
                .credentials(creds)
                .port(smtp_port)
                .build()
        };

        let email_confirmation_service = Arc::new(EmailConfirmationService::new(
            repositories.email_confirmation,
            emailer,
        ));
        let group_service = Arc::new(GroupService::new(repositories.group));
        let post_service = Arc::new(PostService::new(repositories.post, group_service.clone()));
        let user_service = Arc::new(UserService::new(repositories.user));
        let auth_service = Arc::new(AuthService::new(
            email_confirmation_service.clone(),
            user_service.clone(),
            std::env::var("JWT_SECRET").expect("JWT_SECRET is not set"),
        ));

        Self {
            auth: auth_service.clone(),
            bandada: Arc::new(BandadaService::new(
                repositories.bandada_admin,
                HttpClient::new(
                    env::var("BANDADA_URL")
                        .expect("BANDADA_URL is not set")
                        .as_str(),
                ),
            )),
            comment: Arc::new(CommentService::new(
                repositories.comment,
                post_service.clone(),
            )),
            group: group_service,
            post: post_service,
            profile: Arc::new(ProfileService::new(
                repositories.profile,
                auth_service.clone(),
            )),
            user: user_service,
        }
    }
}
