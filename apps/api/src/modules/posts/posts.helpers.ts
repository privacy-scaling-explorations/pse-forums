import { PostSchema, PostAuthorSchema, postSchema } from "@/shared/schemas/post.schema"
import { CommunitySchema } from "@/shared/schemas/community.schema";
import { z } from "zod";

interface PostReply {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  parentId?: string;
  author: PostAuthorSchema;
  replies: PostReply[];
}

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

export function formatPostDbRow(row: any): any {
  // Format community data if present
  let communityData: CommunitySchema | undefined = undefined;
  
  if (row.community_id) {
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

  return {
    id: row.post_id,
    title: row.post_title,
    content: row.post_content,
    createdAt: row.post_created_at,
    updatedAt: row.post_updated_at,
    totalViews: row.post_total_views,
    reactions: row.post_reactions || {},
    isAnon: row.post_is_anon,
    community: row.post_community_id,
    communityData,
    author: row.post_author_id ? {
      id: row.post_author_id,
      username: row.user_username,
      isAnon: row.post_is_anon,
      badges: row.post_author_badges || []
    } : {
      id: null,
      username: null,
      isAnon: true,
      badges: []
    },
    replies: []
  };
}

export function formatReplyDbRow(row: any): any {
  return {
    id: row.reply_id,
    content: row.reply_content,
    createdAt: row.reply_created_at,
    updatedAt: row.reply_updated_at,
    parentId: row.reply_parent_id,
    isAnon: row.reply_is_anon,
    author: row.reply_author_id ? {
      id: row.reply_author_id,
      username: row.reply_user_username,
      isAnon: row.reply_is_anon,
      badges: row.reply_author_badges || []
    } : {
      id: null,
      username: null,
      isAnon: true,
      badges: []
    },
    replies: []
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
