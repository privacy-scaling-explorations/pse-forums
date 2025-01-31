# PSE Freedit

## Just run the whole thing locally

Requirements: [docker](https://docs.docker.com/get-started/get-docker/), [docker-compose](https://docs.docker.com/compose/install/).

```commandline
./start
```

<details>
<summary>What does this do?</summary>

1. Start all services (postgres db, vite client, rust server) as docker containers
2. Opens automatically the frontend in your browser

If you want to stop all the services: `docker compose down`

</details>

## Develop

We use [`mise`](https://mise.jdx.dev) to manage runtimes, manage environment variables, and run tasks.
You can install it and start everything in dev mode with:

```commandline
curl https://mise.run | sh
mise activate
mise run d
```

<details>
<summary>What does this do?</summary>

1. Installs [`mise`](https://mise.jdx.dev)
2. Installs necessary runtimes (bun, rust)
3. Installs necessary packages (node_modules, cargo deps)
4. Spins up a postgres database and runs the migrations against it
5. Generates prisma client and corresponding TS types
6. Starts the api server in dev mode
7. Starts the frontend client in dev mode

</details>
