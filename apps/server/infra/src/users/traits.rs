use anyhow::Result;
use async_trait::async_trait;

#[async_trait]
pub trait Create<T> {
    async fn create(&self, item: T) -> Result<T>;
}

#[async_trait]
pub trait Read<T, ID> {
    async fn read(&self, id: ID) -> Result<T>;
}

#[async_trait]
pub trait Update<T> {
    async fn update(&self, item: T) -> Result<T>;
}

#[async_trait]
pub trait Delete<ID> {
    async fn delete(&self, id: ID) -> Result<()>;
}
