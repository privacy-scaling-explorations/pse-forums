use super::http_client::HttpClient;
use anyhow::Result;
use db::bandada_admin;
use derive_more::derive::Constructor;
use domain::Read;
use infra::BandadaAdminRepository;
use std::sync::Arc;

/// Bandada is a service that manages Semaphore groups.
/// https://bandada.pse.dev/
#[derive(Constructor)]
pub struct BandadaService {
    bandada_admin: Arc<BandadaAdminRepository>,
    req: HttpClient,
}

impl BandadaService {
    async fn get_api_key(&self, uid: i32) -> Result<String> {
        let bandada_admin::Data { api_key, .. } = self.bandada_admin.read(uid).await?;
        Ok(api_key)
    }

    pub async fn maybe_join(&self, gid: i32, uid: i32) -> Result<()> {
        // lookup semaphore id commitment corresponding to uid
        // check self.is_member()
        // maybe add member with https://api.bandada.pse.dev/#/groups/GroupsController_addMember
        // self.req.post...
        todo!("")
    }

    pub async fn is_member(&self, gid: i32, uid: i32) -> Result<bool> {
        // https://api.bandada.pse.dev/#/groups/GroupsController_isGroupMember
        todo!("")
    }
}
