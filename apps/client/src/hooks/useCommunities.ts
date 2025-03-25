import { useQuery } from "@tanstack/react-query";
import { API_URL } from "../settings";
export const useGetCommunities = () => {
  return useQuery({
    queryKey: ["getCommunities"],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/api/communities`);
      return res.json();
    },
  });
        };

export const useGetCommunityById = (id: string) => {
  return useQuery({
    queryKey: ["getCommunityById", id],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/api/communities/${id}`);
      return res.json();
    },
  });
};
