FROM nginx:alpine AS base
WORKDIR /usr/share/nginx/html

FROM oven/bun:latest AS builder
WORKDIR /app
COPY . .
RUN bun i --frozen-lockfile
RUN bun vite build

FROM base AS runtime
RUN rm -fr ./*
COPY --from=builder /app/dist ./
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
