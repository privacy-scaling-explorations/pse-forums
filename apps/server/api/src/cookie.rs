use tower_cookies::cookie::{Cookie as TowerCookie, SameSite};

#[derive(Debug)]
pub struct Cookie {
    pub name: String,
    pub value: String,
    pub path: String,
    pub domain: String,
    pub secure: bool,
    pub http_only: bool,
    pub same_site: Option<SameSite>,
}

impl Cookie {
    pub fn new(name: &str, value: impl Into<String>) -> Self {
        let is_prod =
            std::env::var("RUST_ENV").unwrap_or_else(|_| "development".to_string()) == "production";

        Self {
            name: name.to_string(),
            value: value.into(),
            path: "/".to_string(),
            domain: if is_prod {
                std::env::var("HOST").expect("HOST env var not set")
            } else {
                "localhost".to_string()
            },
            secure: is_prod,
            http_only: true,
            same_site: Some(SameSite::Lax),
        }
    }
}

impl From<Cookie> for TowerCookie<'static> {
    fn from(
        Cookie {
            name,
            value,
            path,
            domain,
            secure,
            http_only,
            same_site,
        }: Cookie,
    ) -> Self {
        let mut cookie = TowerCookie::new(name, value);
        cookie.set_path(path);
        cookie.set_domain(domain);
        cookie.set_secure(secure);
        cookie.set_http_only(http_only);
        cookie.set_same_site(same_site);
        cookie
    }
}
