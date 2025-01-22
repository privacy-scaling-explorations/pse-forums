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
            .unwrap()
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
            .unwrap()
    };
}

macro_rules! Post {
    ($client:expr, $user_id:expr, $title:expr, $content:expr, ($($tag:expr),*)) => {
        $client
            .post()
            .create(
                $title.to_string(),
                $content.to_string(),
                vec![post::uid::set(Some($user_id)), post::tags::set(vec![$($tag.to_string()),*])],
            )
            .exec()
            .await.unwrap()
    };
}

macro_rules! Comment {
    ($client:expr, $pid:expr, $uid:expr, $content:expr) => {
        $client
            .comment()
            .create(
                $content.to_string(),
                post::id::equals($pid),
                vec![comment::uid::set(Some($uid))],
            )
            .exec()
            .await
            .unwrap()
    };
}

#[tokio::main]
async fn main() {
    let client = init_prisma().await.unwrap();
    let user1 = User!(client, "user1@example.com", "11111111", "user1");
    let user2 = User!(client, "user2@example.com", "22222222", "user2");

    Profile!(
        client,
        user1.id,
        "User1's profile",
        "https://user1profile.example.com"
    );
    Profile!(
        client,
        user2.id,
        "User2's profile",
        "https://user2profile.example.com"
    );

    let post1 = Post!(
        client,
        user1.id,
        "Post Title 1",
        "This is the content of post 1",
        ("tag1", "tag2")
    );
    let post2 = Post!(
        client,
        user2.id,
        "Post Title 2",
        "This is the content of post 2",
        ("tag3")
    );

    // Comment!(
    //     client,
    //     post1.id,
    //     user1.id,
    //     "This is a comment on Post 1 by User 1"
    // );
    // Comment!(
    //     client,
    //     post1.id,
    //     user2.id,
    //     "This is another comment on Post 1 by User 2"
    // );
    // Comment!(
    //     client,
    //     post2.id,
    //     user1.id,
    //     "This is a comment on Post 2 by User 1"
    // );

    println!("Database seeded successfully!");
}
