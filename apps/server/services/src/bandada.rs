use std::sync::Arc;

use crate::error::Result;
use db::bandada_group;
use derive_more::derive::Constructor;
use domain::{Description, Name, Read};
use infra::BandadaAdminRepository;

/// Bandada is a service that manages Semaphore groups.
/// https://bandada.pse.dev/
#[derive(Constructor)]
pub struct BandadaService(Arc<BandadaAdminRepository>);

pub struct CreateBandadaGroupData {
    pub description: Description,
    pub name: Name,
    pub uid: i32,
}

impl BandadaService {
    async fn get_api_key(&self, uid: i32) -> Result<String> {
        let db::bandada_admin::Data { api_key, .. } = self.0.read(uid).await?;
        Ok(api_key)
    }
    pub async fn create_group(
        &self,
        CreateBandadaGroupData {
            description,
            name,
            uid,
        }: CreateBandadaGroupData,
    ) -> Result<bandada_group::Data> {
        let api_key = self.get_api_key(uid);

        // make request to bandada api to create group

        todo!()
    }
    /// * bgid: The Bandada group id (not to be confused with a forum group id).
    pub async fn members(&self, bgid: String) -> Result<()> {
        todo!()
    }
}
