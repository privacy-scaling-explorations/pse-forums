import { PostSchema, PostAuthorSchema, postSchema } from "@/shared/schemas/post.schema"
import { CommunitySchema } from "@/shared/schemas/community.schema";
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
            id: childReply.user_is_anon ? null : childReply.user_id,
            isAnon: !!childReply.user_is_anon,
            badges: Array.isArray(childReply.badges) ? childReply.badges : []
          }
        }))

      return {
        id: reply.id,
        content: reply.content || "",
        createdAt: reply.created_at,
        author: {
          id: reply.user_is_anon ? null : reply.user_id,
          isAnon: !!reply.user_is_anon,
          badges: Array.isArray(reply.badges) ? reply.badges : []
        },
        replies: childReplies,
      }
    })
}

export function formatPostDbRow(row: any): Partial<PostSchema> {
  // Format community and communityData if present
  let community = null;
  let communityData: CommunitySchema | undefined = undefined;
  
  if (row.community_id) {
    community = row.community_id;
    communityData = {
      id: row.community_id,
      name: row.community_name || "",
      description: row.community_description || "",
      createdAt: row.community_created_at || new Date().toISOString(),
      updatedAt: row.community_updated_at || new Date().toISOString(),
      requiredBadges: [],
      members: [],
      avatar: '',
      banner: '',
    } as CommunitySchema;
  }

  // Format author
  let author: PostAuthorSchema = {
    id: null,
    isAnon: row.post_is_anon,
    badges: [],
    username: null,
  };

  if (row.post_author_id && !row.post_is_anon) {
    author = {
      id: row.post_author_id,
      isAnon: row.post_is_anon,
      badges: safeJsonParse(row.user_badges, []),
      username: row.user_username,
    };
  }

  return {
    id: row.post_id,
    title: row.post_title,
    content: row.post_content,
    createdAt: row.post_created_at,
    updatedAt: row.post_updated_at,
    author,
    isAnon: row.post_is_anon,
    totalViews: row.post_total_views,
    reactions: safeJsonParse(row.post_reactions, {}),
    community,
    communityData,
    replies: [] as any[],
  };
}

export function formatReplyDbRow(row: any): any {
  // Format author
  let author: PostAuthorSchema = {
    id: null,
    isAnon: row.reply_is_anon,
    badges: [],
    username: null,
  };

  if (row.reply_author_id && !row.reply_is_anon) {
    author = {
      id: row.reply_author_id,
      isAnon: row.reply_is_anon,
      badges: safeJsonParse(row.reply_user_badges, []),
      username: row.reply_user_username,
    };
  }

  return {
    id: row.reply_id,
    content: row.reply_content,
    createdAt: row.reply_created_at,
    updatedAt: row.reply_updated_at,
    author,
    isAnon: row.reply_is_anon,
    parentId: row.reply_parent_id,
    replies: [],
  };
}

// Helper function to safely parse JSON
function safeJsonParse(jsonString: any, defaultValue: any) {
  if (!jsonString) return defaultValue;
  
  // If already an object, return as is
  if (typeof jsonString === 'object') return jsonString;
  
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Error parsing JSON:', error, 'Value was:', jsonString);
    return defaultValue;
  }
}
