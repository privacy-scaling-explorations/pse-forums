FROM debian:bookworm-slim as base
WORKDIR /app
RUN apt update &&\
    apt install -y libssl-dev

FROM rust:latest as build
WORKDIR /app
COPY ./apps/server ./apps/server
COPY ./Cargo.* ./
RUN cargo fetch
RUN cargo run \
    --manifest-path apps/server/db/Cargo.toml \
    -F bin \
    --bin prisma -- \
    generate --schema apps/server/db/schema.prisma
RUN cargo build \
    --manifest-path apps/server/api/Cargo.toml \
    -r \
    --bin api

FROM base as runtime
WORKDIR /app
COPY --from=build /app/target/release/api ./
EXPOSE 3000
CMD ["./api"]
