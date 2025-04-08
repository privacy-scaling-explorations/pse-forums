import { UserPage } from "@/sections/App/UserPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_left-sidebar/user/$username")({
    component: UserPage,
    loader: async ({ params: { username } }) => {
      return {
        username,
      };
    },
  });
