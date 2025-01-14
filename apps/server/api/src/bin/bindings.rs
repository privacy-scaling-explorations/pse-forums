use api::mount;

fn main() {
    // TODO: handle errors
    mount()
        .export_ts(std::path::PathBuf::from(
            std::env::var("PRISMA_GEN_TS_BINDINGS_ABS_PATH").unwrap(),
        ))
        .unwrap();
}
