function isEnvVarDefined(name: string, value: unknown) {
  if (value === "") {
    console.error(`Missing environment variable ${name}`)
  }
}

export const LOCAL_STORAGE_KEYS = {
  APP_ID: "pse-form",
  POST_DRAFT: "post-draft",
}

function getEnvVar<T extends string>(name: T) {
  const value = import.meta.env[name] ?? ""
  isEnvVarDefined(name, value)
  return value
}

interface Config {
  serverUrl: string
}

export const config: Config = {
  serverUrl: "http://server:3000",
}
