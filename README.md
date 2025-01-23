# PSE Freedit

## Develop

### TLDR

```commandline
curl https://mise.run | sh
mise activate
mise d
```

This will:

- install [`mise`](https://mise.jdx.dev)
- install necessary runtimes (bun, rust)
- install necessary packages (node_modules, cargo deps)
- spin up a postgres database and run the migrations against it
- generate prisma client and corresponding TS types
- start the api server in dev mode
- start the frontend client in dev mode

### Inbucket

During local development, magic links mails can be read with the local [inbucket server](http://127.0.0.1:54324/).
