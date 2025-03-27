import { useMutation, useQuery } from "@tanstack/react-query"
import { API_URL } from "../settings"
export const useGetCommunities = () => {
  return useQuery({
    queryKey: ["getCommunities"],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/api/communities`)
      return res.json()
    },
  })
}

export const useGetCommunityById = (id: string) => {
  return useQuery({
    queryKey: ["getCommunityById", id],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/api/communities/${id}`)
      return res.json()
    },
  })
}

export const useGetCommunityPosts = (id: string) => {
  return useQuery({
    queryKey: ["getCommunityPosts", id],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/api/communities/${id}/posts`)
      return res.json()
    },
  })
}

export const useJoinCommunity = () => {
  return useMutation({
    mutationFn: async ({ id, userId }: { id: string | number; userId: string  }) => {
      const res = await fetch(`${API_URL}/api/communities/${id}/join`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId }),
      })
      return res.json()
    },
  })
}
