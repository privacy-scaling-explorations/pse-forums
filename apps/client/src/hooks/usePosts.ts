import { useMutation, useQuery } from "@tanstack/react-query"
import { useStorage } from "./useStorage"
import { LOCAL_STORAGE_KEYS } from "@/lib/config"
import { PostSchema } from "@/shared/schemas/post"

export const useGetPosts = () => {
  return useQuery({
    queryKey: ["getPosts"],
    queryFn: (): Promise<PostSchema[]> => fetch("http://localhost:3001/api/posts").then((res) => res.json()),
  });
};

export const useGetPostById = (postId: number) => {
  return useQuery({
    queryKey: ["post.read", postId],
    queryFn: () => {
      const postById = fetch(`http://localhost:3001/api/posts/${postId}`).then((res) => res.json())
      if (!postById) {
        throw new Error("Post not found")
      }
      return postById
    },
  })
}

interface PostDraft {
  id: string
  title?: string
  content?: string
  communityId?: string
  createdAt: number
}

export const useCreateDraftMutation = () => {
  const { getItem, setItem } = useStorage<PostDraft[]>(LOCAL_STORAGE_KEYS.POST_DRAFT)

  return useMutation({
    mutationFn: (draft: Omit<PostDraft, 'id' | 'createdAt'>): any => {
      const drafts = getItem() || []
      const newDraft = {
        ...draft,
        id: crypto.randomUUID(),
        createdAt: Date.now()
      }
      setItem([...drafts, newDraft])
      return newDraft
    },
  })
}

export const useGetDrafts = () => {
  const { getItem } = useStorage<PostDraft[]>(LOCAL_STORAGE_KEYS.POST_DRAFT)

  return useQuery({
    queryKey: ["post.drafts"],
    queryFn: () => {
      const drafts = getItem() || []
      return drafts
    },
  })
}

export const useRemoveDraft = (): any => {
  const { getItem, setItem } = useStorage<PostDraft[]>(LOCAL_STORAGE_KEYS.POST_DRAFT)

  return useMutation({
    mutationFn: (draftId: string): any => {
      const drafts = getItem() || []
      const filteredDrafts = drafts.filter(draft => draft.id !== draftId)
      return setItem(filteredDrafts)
    },
  })
}

export const useUpdateDraft = () => {
  const { getItem, setItem } = useStorage<PostDraft[]>(LOCAL_STORAGE_KEYS.POST_DRAFT)

  return useMutation({
    mutationFn: (updatedDraft: PostDraft): any => {
      const drafts = getItem() || []
      const updatedDrafts = drafts.map(draft => 
        draft.id === updatedDraft.id ? updatedDraft : draft
      )
      return setItem(updatedDrafts)
    },
  })
}
