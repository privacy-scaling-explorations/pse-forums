export async function api(endpoint: string, payload?: JSON) {
  return fetch(`/mock/${endpoint}.json`, {
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" },
  }).then((res) => res.json())
}
