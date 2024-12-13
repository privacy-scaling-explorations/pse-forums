export PATH := "./node_modules/.bin:" + env_var('PATH')

default:
    @just --choose

build:
    #!/usr/bin/env -S parallel --shebang --ungroup --jobs {{ num_cpus() }}
    just build-client
    just build-server

[working-directory: 'apps/client']
build-client:
    @bun tsc -b
    bun vite build

[working-directory: 'apps/server']
build-server:
    @cargo build -r

clean-server:
  @rm -fr apps/server/{config.toml,freedit.db,snapshots,static/imgs,tantivy,target}

dev:
    @just dev-client & just dev-server

[working-directory: 'apps/client']
dev-client:
    @bun vite dev

[working-directory: 'apps/server']
dev-server:
    @cargo run

start:
  @just start-server & just start-client

start-server:
  @./apps/server/target/release/freedit

start-client:
    @vite preview
