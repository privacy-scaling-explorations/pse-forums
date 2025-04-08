import { PageContent } from "@/components/PageContent";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Link } from "@tanstack/react-router";
import { AuthWrapper } from "@/components/AuthWrapper";
import { PostItems } from "./PostItems";

export const HomePage = () => {
  return (
    <PageContent className="flex flex-col gap-6">
      <AuthWrapper>
        <div className="flex w-full justify-between">
          <Link
            className="ml-auto"
            to="/post/create"
            search={{ community: undefined }}
          >
            <Button icon={PlusIcon}>New Post</Button>
          </Link>
        </div>
      </AuthWrapper>
      <PostItems />
    </PageContent>
  );
};
