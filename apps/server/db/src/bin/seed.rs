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
    ($client:expr, $description:expr, $name:expr, $bandada_admin_id:expr, ($($tag:expr),*)) => {
        $client
            .group()
            .create(
                $description.to_string(),
                $name.to_string(),
                vec![group::bandada_admin_id::set(Some($bandada_admin_id)), group::tags::set(vec![$($tag.to_string()),*])]
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

async fn seed_database(
    client: &PrismaClient,
) -> Result<((&str, &str, &str), (&str, &str, &str)), prisma_client_rust::QueryError> {
    let user_data_1 = ("user1@example.com", "2Up7ib0&ab", "user1");
    let user_data_2 = ("user2@example.com", "x.70QvcFab", "user2");

    let (user1, user2) = client
        ._transaction()
        .run(|client| async move {
            let user1 = User!(client, user_data_1.0, user_data_1.1, user_data_1.2)?;
            let user2 = User!(client, user_data_2.0, user_data_2.1, user_data_2.2)?;

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
            let group1 = Group!(
                client,
                "This is group 1",
                "group1",
                user1.id,
                ("tag1", "tag2")
            )?;
            let group2 = Group!(client, "This is group 2", "group2", user2.id, ("tag3"))?;
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

    Ok((user_data_1, user_data_2))
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let client = init_prisma().await.unwrap();

    match seed_database(&client).await {
        Ok((user1, user2)) => {
            println!("Database seeded successfully");
            println!("Test users: (email, password, username)");
            println!("{:?}", user1);
            println!("{:?}", user2);
        }
        Err(e) => eprintln!("Error seeding the database: {:#?}", e),
    }

    Ok(())
}
