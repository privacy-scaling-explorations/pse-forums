import { useQuery } from "@tanstack/react-query";
import { API_URL } from "../settings";

export const useGetBadges = () => {
  return useQuery({
    queryKey: ["badges"],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/api/badges`);
      const data = await response.json();
      return data;
    },
  });
};