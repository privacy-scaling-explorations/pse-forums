use crate::{
    error::DomainError,
    site_config::{SiteConfig, SiteConfigRepository},
};
use std::sync::Arc;

pub struct SiteConfigService(Arc<dyn SiteConfigRepository>);

impl SiteConfigService {
    pub fn new(repository: Arc<dyn SiteConfigRepository>) -> Self {
        Self(repository)
    }

    pub async fn get(&self) -> Result<SiteConfig, DomainError> {
        self.0.get().await
    }
}
