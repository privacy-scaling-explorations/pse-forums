import { initTRPC } from '@trpc/server';
import { createPost } from '../modules/posts/posts.service';
import { createPostSchema } from '@/shared/schemas/post.schema';

const t = initTRPC.create();

export const router = t.router;
export const publicProcedure = t.procedure;

export const appRouter = router({
  post: router({
    create: publicProcedure
      .input(createPostSchema)
      .mutation(async ({ input }) => {
        return createPost(input);
      }),
  }),
});

export type AppRouter = typeof appRouter; 