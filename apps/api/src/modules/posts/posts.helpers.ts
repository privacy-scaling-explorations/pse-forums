import { PostSchema, postSchema } from "@/shared/schemas/post.schema"
import { z } from "zod";

const formatPostReplies = (repliesRows: any[]) => {
  return repliesRows
    .filter((reply) => !reply.parent_id)
    .map((reply) => {
      const childReplies = repliesRows
        .filter((r) => r.parent_id === reply.id)
        .map((childReply) => ({
          id: childReply.id,
          content: childReply.content || "",
          createdAt: childReply.created_at,
          author: {
            username: childReply.user_is_anon ? null : childReply.username,
            avatar: childReply.avatar || "",
            badges: Array.isArray(childReply.badges) ? childReply.badges : [],
            isAnon: !!childReply.user_is_anon,
          },
        }))

      return {
        id: reply.id,
        content: reply.content || "",
        createdAt: reply.created_at,
        author: {
          username: reply.user_is_anon ? null : reply.username,
          avatar: reply.avatar || "",
          badges: Array.isArray(reply.badges) ? reply.badges : [],
          isAnon: !!reply.user_is_anon,
        },
        replies: childReplies,
      }
    })
}

export const formatPostDbRow = (post: any, repliesRows: any[]): PostSchema => {
  const topLevelReplies = formatPostReplies(repliesRows)

  // Format community if available
  let community = null;
  let communityData = null;
  
  if (post.community_id) {
    community = post.community_id;
    
    // Create full community object
    communityData = {
      id: post.community_id,
      name: post.community_name || "",
      description: post.community_description || "",
      avatar: post.community_avatar || "",
      banner: post.community_banner || "",
      requiredBadges: Array.isArray(post.community_required_badges) 
        ? post.community_required_badges 
        : [],
      members: Array.isArray(post.community_members) 
        ? post.community_members 
        : [],
      createdAt: post.community_created_at || new Date().toISOString(),
      updatedAt: post.community_updated_at || new Date().toISOString()
    };
  }

  const formattedPost = {
    id: post.id,
    title: post.title || "",
    content: post.content || "",
    createdAt: post.created_at || new Date().toISOString(),
    updatedAt: post.updated_at || new Date().toISOString(),
    totalViews: typeof post.total_views === 'number' ? post.total_views : 0,
    reactions: typeof post.reactions === 'object' ? post.reactions : {},
    isAnon: !!post.is_anon,
    community: community,
    communityData: communityData,
    author: {
      username: post.user_is_anon ? null : (post.username || ""),
      avatar: post.avatar || "",
      badges: Array.isArray(post.badges) ? post.badges : [],
      isAnon: !!post.user_is_anon,
    },
    replies: topLevelReplies,
  };

  // Validate against schema
  try {
    return postSchema.parse(formattedPost);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Post schema validation error:", JSON.stringify(error.errors, null, 2));
      console.error("Post data:", JSON.stringify({
        id: post.id,
        title: post.title?.substring(0, 30) + '...' || '(empty title)',
      }, null, 2));
      
      // Try to fix common validation issues
      if (error.errors.some(e => e.path.includes('replies'))) {
        formattedPost.replies = [];
      }
    }
    // Return the best attempt at formatting, even if it doesn't strictly validate
    return formattedPost as PostSchema;
  }
}
