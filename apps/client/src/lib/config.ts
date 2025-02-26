function isEnvVarDefined(name: string, value: unknown) {
  if (value === "") {
    console.error(`Missing environment variable ${name}`)
  }
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
