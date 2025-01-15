use async_trait::async_trait;

#[async_trait]
pub trait Create<I, O> {
    async fn create(&self, arg: I) -> O;
}

#[async_trait]
pub trait Read<I, R> {
    async fn read(&self, arg: I) -> R;
}

#[async_trait]
pub trait Update<I, O> {
    async fn update(&self, arg: I) -> O;
}

#[async_trait]
pub trait Delete<ID, R> {
    async fn delete(&self, arg: ID) -> R;
}
