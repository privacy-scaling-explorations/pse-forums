use serde::{Deserialize, Serialize};
use services::{SigninData, SignupData};
use specta::Type;

#[derive(Debug, Clone, Deserialize, Serialize, Type)]
pub struct SignupRequestDto {
    pub email: String,
    pub password: String,
    pub username: String,
}

impl Into<SignupData> for SignupRequestDto {
    fn into(self) -> SignupData {
        SignupData {
            email: self.email,
            pwd: self.password,
            username: self.username,
        }
    }
}

#[derive(Debug, Clone, Deserialize, Serialize, Type)]
pub struct SigninRequestDto {
    pub email: String,
    pub password: String,
}

impl Into<SigninData> for SigninRequestDto {
    fn into(self) -> SigninData {
        SigninData {
            email: self.email,
            pwd: self.password,
        }
    }
}
