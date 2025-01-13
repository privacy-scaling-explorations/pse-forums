use async_trait::async_trait;

#[async_trait]
pub trait Create<I, O> {
    async fn create(&self, item: I) -> O;
}

#[async_trait]
pub trait Read<ID, R> {
    async fn read(&self, id: ID) -> R;
}

#[async_trait]
pub trait Update<I, O> {
    async fn update(&self, item: I) -> O;
}

#[async_trait]
pub trait Delete<ID, R> {
    async fn delete(&self, id: ID) -> R;
}
