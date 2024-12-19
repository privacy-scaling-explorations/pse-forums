import { config } from "./config"

export async function api(endpoint: string, payload?: JSON) {
  return fetch(`${config.serverUrl}/${endpoint}.json`, {
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" },
  }).then((res) => res.json())
}
