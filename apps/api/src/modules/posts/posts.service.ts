import { postMocks } from '@shared/mocks/posts.mocks';
import { schemaPost, type PostSchema } from '@shared/schemas/post';

export async function getPosts(): Promise<PostSchema[]> {
  return postMocks;
}

export async function getPost(id: number): Promise<PostSchema | undefined> {
  const post = postMocks.find(p => p.id === id);
  if (!post) return undefined;
  
  return schemaPost.parse(post);
} 