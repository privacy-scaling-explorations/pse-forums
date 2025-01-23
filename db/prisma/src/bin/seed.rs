use crypto::hash_pwd;
use prisma::*;

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

macro_rules! Post {
    ($client:expr, $uid:expr, $title:expr, $content:expr, ($($tag:expr),*)) => {
        $client
            .post()
            .create(
                $title.to_string(),
                $content.to_string(),
                vec![post::uid::set(Some($uid)), post::tags::set(vec![$($tag.to_string()),*])],
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

    let (post1, post2, user1, user2) = client
        ._transaction()
        .run(|client| async move {
            let post1 = Post!(
                client,
                user1.id,
                "Post Title 1",
                "This is the content of post 1",
                ("tag1", "tag2")
            )?;
            let post2 = Post!(
                client,
                user2.id,
                "Post Title 2",
                "This is the content of post 2",
                ("tag3")
            )?;

            Ok((post1, post2, user1, user2))
        })
        .await?;

    // todo: fix Comment! macro
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
