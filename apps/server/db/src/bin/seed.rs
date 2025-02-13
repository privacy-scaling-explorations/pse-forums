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
                    profile::about::set($about.to_string()),
                    profile::url::set($url.to_string()),
                ],
            )
            .exec()
            .await
    };
}

macro_rules! Group {
    ($client:expr, $name:expr, $aid:expr, $description:expr, $anonymous:expr, ($($tag:expr),*)) => {
        $client
            .group()
            .create(
                $name.to_string(),
                user::id::equals($aid),
                vec![group::anonymous::set($anonymous), group::description::set($description.to_string()), group::tags::set(vec![$($tag.to_string()),*])]
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
                $title.to_string(),
                $content.to_string(),
                vec![post::uid::set(Some($uid)), post::gid::set($gid),post::tags::set(vec![$($tag.to_string()),*])],
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

    let default_group = client
        .group()
        .find_first(vec![group::name::equals("Default".to_string())])
        .exec()
        .await
        .expect("Failed to find default group")
        .expect("No default group found");

    let (group1, group2) = client
        ._transaction()
        .run(|client| async move {
            let group1 = Group!(
                client,
                "group1",
                user1.id,
                "This is group 1",
                true,
                ("tag1", "tag2")
            )?;
            let group2 = Group!(
                client,
                "group2",
                user2.id,
                "This is group 2",
                false,
                ("tag3")
            )?;
            Ok((group1, group2))
        })
        .await?;

    let (post1, post2, post3, user1, user2) = client
        ._transaction()
        .run(|client| async move {
            let post1 = Post!(
                client,
                "Post Title 1",
                "This is the content of post 1",
                user1.id,
                default_group.id,
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
            let post3 = Post!(
                client,
                "Post Title 3",
                "This is the content of post 3",
                user2.id,
                group1.id,
                ("tag3")
            )?;

            Ok((post1, post2, post3, user1, user2))
        })
        .await?;

    Comment!(client, "Comment by user 1 on post 1", post1.id, user1.id)?;
    Comment!(client, "Comment by user 1 on post 3", post3.id, user1.id)?;
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
            println!("{:?}", ("admin@placeholder.dev", "admin", "admin@dm1n!"))
        }
        Err(e) => eprintln!("Error seeding the database: {:#?}", e),
    }

    Ok(())
}
