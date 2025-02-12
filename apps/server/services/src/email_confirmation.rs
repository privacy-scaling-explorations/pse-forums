use anyhow::Result;
use async_trait::async_trait;
use derive_more::derive::Constructor;
use domain::{Create, Delete, Email, EmailConfirmation, Read, Token};
use infra::EmailConfirmationRepository;
use lettre::{Message, SmtpTransport, Transport};
use std::sync::Arc;

#[derive(Constructor)]
pub struct EmailConfirmationService(Arc<EmailConfirmationRepository>, SmtpTransport);

#[async_trait]
impl Create<i32, Result<EmailConfirmation>> for EmailConfirmationService {
    async fn create(&self, uid: i32) -> Result<EmailConfirmation> {
        self.0.create(uid).await.map(EmailConfirmation::from)
    }
}

#[async_trait]
impl Read<Token, Result<EmailConfirmation>> for EmailConfirmationService {
    async fn read(&self, token: Token) -> Result<EmailConfirmation> {
        self.0.read(token).await.map(EmailConfirmation::from)
    }
}

#[async_trait]
impl Delete<Token, Result<EmailConfirmation>> for EmailConfirmationService {
    /// will automatically update user.email_confirmed to true via psql trigger IF token is valid
    async fn delete(&self, token: Token) -> Result<EmailConfirmation> {
        self.0.delete(token).await.map(EmailConfirmation::from)
    }
}

impl EmailConfirmationService {
    pub async fn send_confirmation_email(&self, uid: i32, email: &Email) -> Result<()> {
        let EmailConfirmation { token, .. } = self.create(uid).await?;
        let server_url = std::env::var("VITE_SERVER_URL").expect("Missing VITE_SERVER_URL env var");
        let confirmation_link = format!("{}/confirm-email?token={}", server_url, token);
        let email = Message::builder()
            .from(
                std::env::var("EMAIL_FROM")
                    .expect("Missing EMAIL_FROM env var")
                    .parse()
                    .unwrap(),
            )
            .to(email.as_ref().parse().unwrap())
            .subject("PSE FORUM: Confirm your Email")
            .body(format!(
                "Click to confirm your registration: {}",
                confirmation_link
            ))
            .unwrap();

        self.1.send(&email)?;

        Ok(())
    }

    pub async fn confirm_email(&self, token: Token) -> Result<()> {
        self.delete(token).await?;
        Ok(())
    }
}
