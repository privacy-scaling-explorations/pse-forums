use thiserror::Error;

#[derive(Debug, Error)]
pub enum DomainError {
    #[error("You have been banned")]
    Banned,
    #[error("Too many inns you are managing")]
    InnCreateLimit,
    #[error("{0}")]
    Internal(String),
    #[error("It has been locked or hidden")]
    LockedOrHidden,
    #[error("Name already exists")]
    NameExists,
    #[error("Name should not start with a number, should be <a href='https://doc.rust-lang.org/std/primitive.char.html#method.is_alphanumeric'>alphanumeric</a> or '_' or ' '")]
    NameInvalid,
    #[error("You must join inn first")]
    NoJoinedInn,
    #[error("Please login first")]
    NonLogin,
    #[error("Not found")]
    NotFound,
    #[error("The site is under maintenance. It is read only at the moment")]
    ReadOnly,
    #[error("Too many attempts please try again later")]
    WriteInterval,
    #[error("wrong password")]
    WrongPassword,
}

#[derive(Error, Debug)]
pub enum AppError {}
