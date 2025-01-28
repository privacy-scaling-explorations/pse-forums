use crypto::hash_pwd;
use db::*;

macro_rules! User {
    ($client:expr, $email:expr, $password:expr, $username:expr) => {{
        let (salt, encrypted_password) = hash_pwd($password).unwrap();
        $client
            .user()
            .create(
                $email.to_string(),
                encrypted_password,
                salt,
                $username.to_string(),
                vec![],
            )
            .exec()
            .await
    }};
}

macro_rules! Profile {
    ($client:expr, $uid:expr, $about:expr, $url:expr) => {
        $client
            .profile()
            .update(
                profile::id::equals($uid),
                vec![
                    profile::about::set(Some($about.to_string())),
                    profile::url::set(Some($url.to_string())),
                ],
            )
            .exec()
            .await
    };
}

macro_rules! Group {
    ($client:expr, $description:expr, $name:expr, ($($tag:expr),*)) => {
        $client
            .group()
            .create(
                $description.to_string(),
                $name.to_string(),
                vec![ group::tags::set(vec![$($tag.to_string()),*])]
            )
            .exec()
            .await
    };
}

macro_rules! Post {
    ($client:expr, $title:expr, $content:expr, $uid:expr, $gid:expr, ($($tag:expr),*)) => {
        $client
            .post()
            .create(
                $content.to_string(),
                $title.to_string(),
                vec![post::uid::set(Some($uid)), post::gid::set(Some($gid)),post::tags::set(vec![$($tag.to_string()),*])],
            )
            .exec()
            .await
    };
}

macro_rules! Comment {
    ($client:expr, $content:expr, $pid:expr, $uid:expr) => {
        $client
            .comment()
            .create_unchecked(
                $pid,
                $content.to_string(),
                vec![comment::UncheckedSetParam::Uid(Some($uid))],
            )
            .exec()
            .await
    };
}

// type Ok<T> = Result<T, prisma_client_rust::QueryError>;

async fn seed_database(client: &PrismaClient) -> Result<(), prisma_client_rust::QueryError> {
    let (user1, user2) = client
        ._transaction()
        .run(|client| async move {
            let user1 = User!(client, "user1@example.com", "11111111", "user1")?;
            let user2 = User!(client, "user2@example.com", "22222222", "user2")?;

            Ok((user1, user2))
        })
        .await?;

    let (user1, user2) = client
        ._transaction()
        .run(|client| async move {
            Profile!(
                client,
                user1.id,
                "User1's profile",
                "https://user1profile.example.com"
            )?;
            Profile!(
                client,
                user2.id,
                "User2's profile",
                "https://user2profile.example.com"
            )?;

            Ok((user1, user2))
        })
        .await?;

    let (group1, group2) = client
        ._transaction()
        .run(|client| async move {
            let group1 = Group!(client, "This is group 1", "group1", ("tag1", "tag2"))?;
            let group2 = Group!(client, "This is group 2", "group2", ("tag3"))?;
            Ok((group1, group2))
        })
        .await?;

    let (post1, post2, user1, user2) = client
        ._transaction()
        .run(|client| async move {
            let post1 = Post!(
                client,
                "Post Title 1",
                "This is the content of post 1",
                user1.id,
                group1.id,
                ("tag1", "tag2")
            )?;
            let post2 = Post!(
                client,
                "Post Title 2",
                "This is the content of post 2",
                user2.id,
                group2.id,
                ("tag3")
            )?;

            Ok((post1, post2, user1, user2))
        })
        .await?;

    Comment!(client, "Comment by user 1 on post 1", post1.id, user1.id)?;
    Comment!(client, "Comment by user 2 on post 2", post2.id, user2.id)?;
    Comment!(client, "Comment by user 2 on post 1", post1.id, user2.id)?;

    Ok(())
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let client = init_prisma().await.unwrap();

    match seed_database(&client).await {
        Ok(_) => println!("Database seeded successfully"),
        Err(e) => eprintln!("Error seeding the database: {:#?}", e),
    }

    Ok(())
}
