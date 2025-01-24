FROM alpine:latest as base
WORKDIR /app
RUN apk update &&\
    apk upgrade &&\
    apk cache clean

FROM rust:latest as build
WORKDIR /app
COPY ./apps/server ./apps/server
COPY ./Cargo.* ./
RUN cargo fetch &&\
    cargo run --bin prisma &&\
    cargo build -r -p api --bin api

FROM base as runtime
WORKDIR /app
COPY --from=build /app/target/release/api ./
EXPOSE 3000
CMD ["./api"]
