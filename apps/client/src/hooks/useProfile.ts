import { useQuery } from "@tanstack/react-query"
import { API_URL } from "../settings"

export const useGetProfile = ({ username }: { username: string }) => {
  return useQuery({
    queryKey: ["getProfile", username],
    queryFn: () => {
      const profile = fetch(`${API_URL}/api/users/${username}`).then((res) =>
        res.json(),
      )
      if (!profile) {
        throw new Error("Profile not found")
      }
      return profile
    },
  })
}
