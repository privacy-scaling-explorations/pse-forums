# PSE Forums

## Supabase Self-Hosted Setup

This project includes a self-hosted Supabase setup that provides:
- PostgreSQL database with custom extensions
- REST API via PostgREST
- Storage API
- Authentication
- Supabase Studio UI

## Configuration

All configuration is managed through a single `.env` file in the project root. This file contains all the environment variables needed for both the main application and the Supabase services.

### Environment Variables

The key environment variables include:
- `SUPABASE_ANON_KEY` - Anonymous API key for client-side authentication
- `SUPABASE_SERVICE_KEY` - Service role API key for server-side operations
- `JWT_SECRET` - Secret used for JWT authentication
- `DASHBOARD_USERNAME` and `DASHBOARD_PASSWORD` - Credentials for accessing Supabase Studio

## Running the Application

To start the entire application with Supabase services:

```bash
docker compose -f docker-compose.combined.yml --env-file .env up -d
```

This will start:
1. The PostgreSQL database
2. Supabase services (REST API, Storage, Meta, Studio)
3. The application API
4. The application client

### Troubleshooting

If you encounter a network error like:
```
network pse-forum-network was found but has incorrect label com.docker.compose.network
```

Run the following commands to fix it:
```bash
# Stop all containers
docker compose down --remove-orphans

# Remove the existing network
docker network rm pse-forum-network

# Start again
docker compose -f docker-compose.combined.yml --env-file .env up -d
```

## Accessing Supabase

### Supabase Studio
- URL: http://localhost:8000
- Username: `supabase` (or the value of `DASHBOARD_USERNAME` in .env)
- Password: `this_password_is_insecure_and_should_be_updated` (or the value of `DASHBOARD_PASSWORD` in .env)

### REST API
- Base URL: http://localhost:8000/rest/v1
- Authentication: Add header `apikey: [SUPABASE_ANON_KEY]`

## Development

When developing, you can access:
- Client application: http://localhost:5173
- API: http://localhost:3001

## Client

|                 Freedit                 |                    New UI dev version                    |
| :-------------------------------------: | :------------------------------------------------------: |
| [forum.pse.dev](https://forum.pse.dev/) | [forum-blond.vercel.app](https://forum-blond.vercel.app) |

## Just run the whole thing locally

☑️ Requirements: [docker](https://docs.docker.com/get-started/get-docker/), [docker-compose](https://docs.docker.com/compose/install/).

- ▶️ `./up` to start everything

  <details>
  <summary>❔</summary>
  This will:

  1. Start all services (postgres db, vite client, rust server) as docker containers
  2. Opens automatically the frontend in your browser
  </details>

- ⏹️ `./down` to stop everything
  <details>
  <summary>❔</summary>
  This will stop all the services (nothing else than `docker compose down`).
  </details>

## Develop

We use [`mise`](https://mise.jdx.dev) to manage runtimes, manage environment variables, and run tasks.\
Install it and start everything in dev mode with:

```commandline
curl https://mise.run | sh
mise activate
mise run d
```

<details>
<summary>❔</summary>

1. Installs [`mise`](https://mise.jdx.dev)
2. Installs necessary runtimes (bun, rust)
3. Installs necessary packages (node_modules, cargo deps)
4. Spins up a postgres database and runs the migrations against it
5. Generates prisma client and corresponding TS types
6. Starts the api server in dev mode
7. Starts the frontend client in dev mode

</details>

### Inbucket

During local development, we use [inbucket](https://github.com/inbucket/inbucket) to receive confirmation emails.\
The mailboxes are available at [localhost:9000](http://localhost:9000).

### Monitoring

The docker compose setup includes a [Grafana](https://grafana.com), [Loki](https://grafana.com/oss/loki), and [Promtail](https://grafana.com/docs/loki/latest/send-data/promtail/) instances to monitor the server logs.
The Grafana dashboard is accessible at [localhost:3002](http://localhost:3002) during local development.

<details>
<summary>You will have to add the Loki data source to your grafana instance
</summary>

1. Go to [localhost:3002](http://localhost:3002)
2. Default credentials are `admin:admin`
3. Explore > open advanced data source picker

   ![capture](https://github.com/user-attachments/assets/5c8cc799-0763-4f7a-8635-724b3e5038e7)\

4. Configure new data source > search for loki
6. Add connection url

Pay attention to which network you are on, in case loki and grafana runs within the docker network or localhost: `http://<loki|localhost>:3100`

</details>

## Freedit

This project started as a fork of [Freedit](https://github.com/FreedEdit/freedit), but has since diverged quite a bit.\
[forum.pse.dev](https://forum.pse.dev/) still runs this original freedit codebase.\
Run it with:

```commandline
mise r freedit
```

or

```commandline
cargo run -r --bin freedit
```

## [Technical Design Document](./docs/tdd.md)
