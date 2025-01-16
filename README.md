# PSE Freedit

## Develop

### TLDR

```commandline
curl https://mise.run | sh
mise activate
mise d
```

This will:

- install necessary runtimes (bun, rust)
- install necessary packages (node_modules, cargo deps)
- spin up a postgres database and run the migrations against it
- generate prisma client and corresponding TS types
- start the api server in dev mode
- start the frontend client in dev mode
