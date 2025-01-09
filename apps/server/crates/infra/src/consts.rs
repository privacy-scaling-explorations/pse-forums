use std::{
    env,
    fs::File,
    io::{BufReader, Read},
    sync::LazyLock,
};

use data_encoding::HEXLOWER;
use ring::digest::{Context, Digest, SHA256};

pub const GIT_COMMIT: &str = env!("GIT_COMMIT");

pub const VERSION: &str = env!("CARGO_PKG_VERSION");

pub static CURRENT_SHA256: LazyLock<String> = LazyLock::new(|| {
    fn sha256_digest<R: Read>(mut reader: R) -> Digest {
        let mut context = Context::new(&SHA256);
        let mut buffer = [0; 1024];

        loop {
            let count = reader.read(&mut buffer).unwrap();
            if count == 0 {
                break;
            }
            context.update(&buffer[..count]);
        }
        context.finish()
    }

    let file = env::current_exe().unwrap();
    let input = File::open(file).unwrap();
    let reader = BufReader::new(input);
    let digest = sha256_digest(reader);

    HEXLOWER.encode(digest.as_ref())
});
