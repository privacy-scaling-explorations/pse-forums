use async_trait::async_trait;
use bincode::{Decode, Encode};
use garde::Validate;
use serde::{Deserialize, Serialize};

use crate::error::DomainError;

/// Go to source code to see default value: [SiteConfig::default()]
#[derive(Serialize, Deserialize, Encode, Decode, Validate, Debug)]
pub struct SiteConfig {
    #[garde(length(max = 64))]
    site_name: String,
    // domain only used for inn feed
    #[garde(skip)]
    domain: String,
    #[garde(length(max = 5120))]
    description: String,
    #[garde(skip)]
    read_only: bool,
    #[garde(range(max = 32))]
    inn_mod_max: usize,
    #[garde(range(max = 256))]
    title_max_length: usize,
    #[garde(range(max = 65535))]
    article_max_length: usize,
    #[garde(range(max = 65535))]
    comment_max_length: usize,
    #[garde(range(max = 3600))]
    solo_interval: i64,
    #[garde(range(max = 3600))]
    post_interval: i64,
    #[garde(range(max = 3600))]
    comment_interval: i64,
    #[garde(range(max = 100))]
    per_page: usize,
    #[garde(skip)]
    captcha_difficulty: String,
    #[garde(skip)]
    captcha_name: String,
    #[garde(skip)]
    home_page: u8,
    #[garde(skip)]
    spam_regex: Option<String>,
    #[garde(length(max = 16))]
    lang: String,
}

#[async_trait]
pub trait SiteConfigRepository: Send + Sync {
    async fn get(&self) -> Result<SiteConfig, DomainError>;
}
