import { createLazyFileRoute } from "@tanstack/react-router"
import { PostCard } from "c/PostCard"
import { GroupDto } from "l/bindings"
import { useQuery } from "l/rspc"
import { useCallback, useMemo } from "react"
import { Button } from "ui/button"

export const Route = createLazyFileRoute("/")({
  component: Index,
})

function Index() {
  const { data: posts, isLoading: postIsLoading, error: postError } = useQuery(["post.list"])
  // TODO Is there a way we can use the post group ids in the list to only get what we need?
  const { data: groups, isLoading: groupsIsLoading, error: groupErr } = useQuery(["group.list"])

  const idToGroup = useMemo(() => groups?.reduce((prev, cur) => ({
    ...prev,
    [cur.id]: cur,
  }), {} as Record<number, GroupDto>), [groups]);

  const getGroupName = useCallback((gid: number | null): string => {
    if (!gid || !idToGroup[gid]) {
      return "Unkown"
    }

    return idToGroup[gid].name
  }, [idToGroup]);

  const postsWithGroup = useMemo(() =>
    posts?.map((p) => ({
      ...p,
      group_name: getGroupName(p.gid)
    })),
  [posts, idToGroup])

  const error = postError ?? groupErr;
  const isLoading = postIsLoading || groupsIsLoading;

  if (error) {
    console.error(error.message)
    return <div>{error.message}</div>
  }

  // TODO Loading state
  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <div className="flex justify-between mb-2">
        <Button variant="secondary">All</Button>
        <Button>+ New Post</Button>
      </div>
      <ol className="space-y-2">
        {postsWithGroup.map((p) => <PostCard key={p.id} {...p} />)}
      </ol>
    </div>
  )
}
