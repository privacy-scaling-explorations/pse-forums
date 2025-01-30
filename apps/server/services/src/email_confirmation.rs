use super::Result;
use crate::ServiceError;
use async_trait::async_trait;
use derive_more::derive::Constructor;
use domain::{Create, Email, EmailConfirmation};
use infra::EmailConfirmationRepository;
use lettre::{Message, SmtpTransport, Transport};
use std::sync::Arc;

#[derive(Constructor)]
pub struct EmailConfirmationService(Arc<EmailConfirmationRepository>, SmtpTransport);

#[async_trait]
impl Create<i32, Result<EmailConfirmation>> for EmailConfirmationService {
    async fn create(&self, uid: i32) -> Result<EmailConfirmation> {
        self.0
            .create(uid)
            .await
            .map(EmailConfirmation::from)
            .map_err(|e| e.into())
    }
}

impl EmailConfirmationService {
    pub async fn send_confirmation_email(&self, uid: i32, email: &Email) -> Result<()> {
        // insert token into db
        let EmailConfirmation { token, .. } = self.create(uid).await?;

        // get token from db
        // send email
        let confirmation_link = format!("http://localhost:3000/confirm?token={}", token);
        let email = Message::builder()
            .from(
                std::env::var("EMAIL_FROM")
                    .expect("Missing EMAIL_FROM env var")
                    .parse()
                    .unwrap(),
            )
            .to(email.as_ref().parse().unwrap())
            .subject("PSE FORUM: Confirm your Email")
            .body(format!("Click to confirmation link: {}", confirmation_link))
            .unwrap();

        self.1
            .send(&email)
            .map_err(|_| ServiceError::EmailConfirmationSendFailed)?;

        Ok(())
    }
}
