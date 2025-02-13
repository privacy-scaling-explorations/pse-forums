use anyhow::{anyhow, Context, Result};
use async_trait::async_trait;
use db::{comment, post, PrismaClient};
use derive_more::derive::Constructor;
use domain::{Content, Create, Delete, Read, Title, Update};
use std::sync::Arc;

#[derive(Constructor)]
pub struct PostRepository(Arc<PrismaClient>);

pub struct CreatePost {
    pub content: Content,
    pub gid: Option<i32>,
    pub tags: Option<Vec<String>>,
    pub title: Title,
    pub uid: Option<i32>,
}

#[async_trait]
impl Create<CreatePost, Result<post::Data>> for PostRepository {
    async fn create(
        &self,
        CreatePost {
            content,
            gid,
            title,
            tags,
            uid,
        }: CreatePost,
    ) -> Result<post::Data> {
        let extra: Vec<post::UncheckedSetParam> = vec![]
            .into_iter()
            .chain(gid.map(|gid| post::UncheckedSetParam::Gid(gid)))
            .chain(tags.map(|t| post::UncheckedSetParam::Tags(t)))
            .chain(uid.map(|id| post::UncheckedSetParam::Uid(Some(id))))
            .collect();

        self.0
            .post()
            // FIXME: make it work with `create` intead of `create_unchecked`
            .create_unchecked(title.into(), content.into(), extra)
            .with(post::group::fetch())
            .exec()
            .await
            .context("Failed to create post record")
    }
}

pub struct UpdatePost {
    pub content: Option<Content>,
    pub id: i32,
    pub tags: Option<Vec<String>>,
    pub title: Option<Title>,
}

#[async_trait]
impl Update<UpdatePost, Result<post::Data>> for PostRepository {
    async fn update(
        &self,
        UpdatePost {
            content,
            id,
            tags,
            title,
        }: UpdatePost,
    ) -> Result<post::Data> {
        let updates: Vec<post::SetParam> = vec![]
            .into_iter()
            .chain(content.map(|c| post::content::set(c.into())))
            .chain(tags.map(|t| post::tags::set(t)))
            .chain(title.map(|t| post::title::set(t.into())))
            .collect();

        self.0
            .post()
            .update(post::id::equals(id), updates)
            .exec()
            .await
            .context("Failed to update post record")
    }
}

#[async_trait]
impl Read<i32, Result<post::Data>> for PostRepository {
    async fn read(&self, id: i32) -> Result<post::Data> {
        self.0
            .post()
            .find_unique(post::id::equals(id))
            .with(
                post::comments::fetch(vec![comment::pid::equals(id)]).with(comment::user::fetch()),
            )
            .exec()
            .await
            .context("Failed to read post record")?
            .ok_or_else(|| anyhow!("Post record with id {} not found", id))
    }
}

impl PostRepository {
    pub async fn read_by_group(&self, gid: i32) -> Result<Vec<post::Data>> {
        self.0
            .post()
            .find_many(vec![post::gid::equals(gid)])
            .with(post::group::fetch())
            .exec()
            .await
            .context("Failed to read all post records")
    }
}

impl PostRepository {
    pub async fn read_with_comments(&self, id: i32) -> Result<post::Data> {
        self.0
            .post()
            .find_unique(post::id::equals(id))
            .with(post::comments::fetch(vec![]))
            .exec()
            .await
            .context("Failed to read post record with comments relation")?
            .ok_or_else(|| anyhow!("Post record with id {} not found", id))
    }
}

#[async_trait]
impl Delete<i32, Result<post::Data>> for PostRepository {
    async fn delete(&self, id: i32) -> Result<post::Data> {
        self.0
            .post()
            .delete(post::id::equals(id))
            .exec()
            .await
            .context("Failed to delete post record")
    }
}
