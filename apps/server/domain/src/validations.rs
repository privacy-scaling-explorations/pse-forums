use nutype::nutype;
use validator::ValidateEmail;

#[nutype(derive(Deserialize, Serialize, Into, TryFrom), validate(with = is_valid_email, error = String ))]
pub struct Email(String);

fn is_valid_email(email: &str) -> Result<(), String> {
    if ValidateEmail::validate_email(&email) {
        Ok(())
    } else {
        Err("Invalid Email".to_string())
    }
}

fn is_valid_password(password: &str) -> Result<(), String> {
    Ok(())
}

#[nutype(derive(Deserialize, Serialize, AsRef, TryFrom), validate(with = is_valid_password, error=String))]
pub struct Password(String);

#[nutype(
    derive(Deserialize, Serialize, Into, TryFrom),
    validate(len_char_min = 1, len_char_max = 30)
)]
pub struct Username(String);

impl From<UsernameError> for String {
    fn from(err: UsernameError) -> Self {
        format!("Invalid username: {:?}", err)
    }
}

pub struct Content(String);

pub type GroupName = Username; // reusing same validations
pub struct GroupDescription(String);
pub struct Tags(Vec<String>);
pub type PostTitle = Username; // reusing same validations
