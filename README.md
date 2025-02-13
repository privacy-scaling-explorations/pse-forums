
# PSE Forum

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

The docker compose setup includes a [Grafana](https://grafana.com), [Loki](https://grafana.com/oss/loki), and [Promtail](https://grafana.com/docs/loki/latest/send-data/promtail/) instance to monitor the server logs.\
The Grafana dashboard is accessible at [localhost:3002](http://localhost:3002] during local development.
You will have to add the Loki data source to your grafana instance (explore > open advanced data source picker > configure new data source > loki > add url).

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
