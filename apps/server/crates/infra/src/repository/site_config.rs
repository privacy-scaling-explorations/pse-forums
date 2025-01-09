use async_trait::async_trait;
use domain::error::DomainError;
use domain::site_config::{SiteConfig, SiteConfigRepository};
use sled::Db;

use crate::error::InfraError;

pub struct SledConfigRepository(Db);

#[async_trait]
impl SiteConfigRepository for SledConfigRepository {
    async fn get(&self) -> Result<SiteConfig, DomainError> {
        // Use your DB utilities to load the config
        let config_bytes = self
            .0
            .get("site_config")
            .map_err(|e| InfraError::from(e))?
            .ok_or_else(|| DomainError::Internal("Config not found".into()))?;
        let (site_config, _): (SiteConfig, usize) =
            bincode::decode_from_slice(&config_bytes, bincode::config::standard())
                .map_err(|e| DomainError::Internal(e.to_string()))?;
        Ok(site_config)
    }
}
