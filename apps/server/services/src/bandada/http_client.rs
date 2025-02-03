use reqwest::header::{HeaderMap, HeaderValue, CONTENT_TYPE};
use reqwest::{Client, RequestBuilder};
use std::time::Duration;

#[derive(Clone)]
pub struct HttpClient {
    client: Client,
    base_url: String,
}

impl HttpClient {
    pub fn new(base_url: &str) -> Self {
        let mut headers = HeaderMap::new();
        headers.insert(CONTENT_TYPE, HeaderValue::from_static("application/json"));

        let client = Client::builder()
            .default_headers(headers)
            .timeout(Duration::from_secs(10))
            .build()
            .expect("Failed to create reqwest client");

        Self {
            client,
            base_url: base_url.to_string(),
        }
    }

    pub fn post(&self, path: &str) -> RequestBuilder {
        self.client.post(format!("{}/{}", self.base_url, path))
    }

    pub fn get(&self, path: &str) -> RequestBuilder {
        self.client.get(format!("{}/{}", self.base_url, path))
    }

    pub fn patch(&self, path: &str) -> RequestBuilder {
        self.client.patch(format!("{}/{}", self.base_url, path))
    }

    pub fn delete(&self, path: &str) -> RequestBuilder {
        self.client.delete(format!("{}/{}", self.base_url, path))
    }
}
