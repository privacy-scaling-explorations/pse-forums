import { PostSchema, PostAuthorSchema, postReplySchema } from '@/shared/schemas/post.schema';
import { query } from '../../config/database';
import { formatPostDbRow, formatReplyDbRow } from './posts.helpers';
import { z } from 'zod';

// Define the reply type to match PostSchema's replies structure
type PostReply = {
  id: string;
  content: string;
  author: PostAuthorSchema;
  createdAt: string;
  updatedAt: string;
  isAnon: boolean;
  parentId: string | null;
  replies: PostReply[];
};

// Helper function to safely parse JSON (add this if not already present)
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

export async function findAllPosts(): Promise<PostSchema[]> {
  try {
    const result = await query(`
      SELECT 
        p.id as post_id,
        p.title as post_title,
        p.content as post_content,
        p.created_at as post_created_at,
        p.updated_at as post_updated_at,
        p.author_id as post_author_id,
        p.is_anon as post_is_anon,
        p.total_views as post_total_views,
        p.reactions as post_reactions,
        p.community_id as post_community_id,
        u.username as user_username,
        u.avatar as user_avatar,
        u.badges as user_badges,
        c.id as community_id,
        c.name as community_name,
        c.description as community_description,
        c.created_at as community_created_at,
        c.updated_at as community_updated_at
      FROM posts p
      LEFT JOIN users u ON p.author_id = u.id
      LEFT JOIN communities c ON p.community_id = c.id
      ORDER BY p.created_at DESC
    `);

    const posts = await Promise.all(result.rows.map(async (postRow) => {
      // Fetch replies for each post
      const repliesResult = await query(`
        SELECT 
          r.id as reply_id,
          r.content as reply_content,
          r.created_at as reply_created_at,
          r.updated_at as reply_updated_at,
          r.author_id as reply_author_id,
          r.is_anon as reply_is_anon,
          r.parent_id as reply_parent_id,
          u.username as reply_user_username,
          u.avatar as reply_user_avatar,
          u.badges as reply_user_badges
        FROM replies r
        LEFT JOIN users u ON r.author_id = u.id
        WHERE r.post_id = $1
        ORDER BY r.created_at ASC
      `, [postRow.post_id]);

      const post = formatPostDbRow(postRow);
      
      // Format and organize replies
      const formattedReplies = repliesResult.rows.map((reply) => 
        formatReplyDbRow(reply)
      );
      
      // Organize replies into a hierarchy
      const replyMap = new Map<string, PostReply>();
      const topLevelReplies: PostReply[] = [];
      
      formattedReplies.forEach(reply => {
        replyMap.set(reply.id, { ...reply, replies: [] } as PostReply);
      });
      
      formattedReplies.forEach(reply => {
        if (reply.parentId) {
          const parentReply = replyMap.get(reply.parentId);
          if (parentReply) {
            parentReply.replies.push(replyMap.get(reply.id) as PostReply);
          }
        } else {
          topLevelReplies.push(replyMap.get(reply.id) as PostReply);
        }
      });
      
      post.replies = topLevelReplies as any[];
      return post as unknown as PostSchema;
    }));

    return posts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw new Error('Failed to fetch posts from database');
  }
}

export async function findPostById(
  id: string | number,
): Promise<PostSchema | undefined> {
  try {
    const result = await query(`
      SELECT 
        p.id as post_id,
        p.title as post_title,
        p.content as post_content,
        p.created_at as post_created_at,
        p.updated_at as post_updated_at,
        p.author_id as post_author_id,
        p.is_anon as post_is_anon,
        p.total_views as post_total_views,
        p.reactions as post_reactions,
        p.community_id as post_community_id,
        u.username as user_username,
        u.avatar as user_avatar,
        u.badges as user_badges,
        c.id as community_id,
        c.name as community_name,
        c.description as community_description,
        c.created_at as community_created_at,
        c.updated_at as community_updated_at
      FROM posts p
      LEFT JOIN users u ON p.author_id = u.id
      LEFT JOIN communities c ON p.community_id = c.id
      WHERE p.id = $1
    `, [id]);

    // If no post found, return undefined
    if (result.rows.length === 0) {
      return undefined;
    }

    const postRow = result.rows[0];

    // Fetch replies for the post
    const repliesResult = await query(`
      SELECT 
        r.id as reply_id,
        r.content as reply_content,
        r.created_at as reply_created_at,
        r.updated_at as reply_updated_at,
        r.author_id as reply_author_id,
        r.is_anon as reply_is_anon,
        r.parent_id as reply_parent_id,
        u.username as reply_user_username,
        u.avatar as reply_user_avatar,
        u.badges as reply_user_badges
      FROM replies r
      LEFT JOIN users u ON r.author_id = u.id
      WHERE r.post_id = $1
      ORDER BY r.created_at ASC
    `, [postRow.post_id]);

    const post = formatPostDbRow(postRow);
    
    // Format and organize replies
    const formattedReplies = repliesResult.rows.map((reply) => 
      formatReplyDbRow(reply)
    );
    
    // Organize replies into a hierarchy
    const replyMap = new Map<string, PostReply>();
    const topLevelReplies: PostReply[] = [];
    
    formattedReplies.forEach(reply => {
      replyMap.set(reply.id, { ...reply, replies: [] } as PostReply);
    });
    
    formattedReplies.forEach(reply => {
      if (reply.parentId) {
        const parentReply = replyMap.get(reply.parentId);
        if (parentReply) {
          parentReply.replies.push(replyMap.get(reply.id) as PostReply);
        }
      } else {
        topLevelReplies.push(replyMap.get(reply.id) as PostReply);
      }
    });
    
    post.replies = topLevelReplies as any[];
    return post as unknown as PostSchema;
  } catch (error) {
    console.error(`Error fetching post with id ${id}:`, error);
    return undefined;
  }
}

export async function addPostReaction(
  postId: string,
  emoji: string,
  userIds: string[],
): Promise<PostSchema | undefined> {
  try {
    // Get current post with reactions
    const postResult = await query(`
      SELECT 
        p.id as post_id,
        p.title as post_title,
        p.content as post_content,
        p.created_at as post_created_at,
        p.updated_at as post_updated_at,
        p.author_id as post_author_id,
        p.is_anon as post_is_anon,
        p.total_views as post_total_views,
        p.reactions as post_reactions,
        p.community_id as post_community_id,
        u.username as user_username,
        u.avatar as user_avatar,
        u.badges as user_badges
      FROM posts p
      LEFT JOIN users u ON p.author_id = u.id
      WHERE p.id = $1
    `, [postId]);

    if (postResult.rows.length === 0) {
      return undefined;
    }

    const postRow = postResult.rows[0];
    const currentReactions = safeJsonParse(postRow.post_reactions, {});
    
    let reaction = currentReactions[emoji];
    if (!reaction) {
      reaction = {
        emoji,
        count: 0,
        userIds: []
      };
    }

    // Ensure userIds is an array
    if (!Array.isArray(reaction.userIds)) {
      reaction.userIds = [];
    }

    const newUserIds = userIds.filter(id => !reaction.userIds.includes(id));
    reaction.userIds = [...reaction.userIds, ...newUserIds];
    
    reaction.count = reaction.userIds.length;
    
    // For first reaction, ensure count is at least the number of new userIds
    if (newUserIds.length > 0 && reaction.count === 0) {
      reaction.count = newUserIds.length;
    }
    
    currentReactions[emoji] = reaction;
    
    await query(`
      UPDATE posts
      SET reactions = $1
      WHERE id = $2
    `, [JSON.stringify(currentReactions), postId]);
    
    // Fetch the updated post
    return findPostById(postId);
  } catch (error) {
    console.error(`Error adding reaction to post ${postId}:`, error);
    return undefined;
  }
}

export async function removePostReaction(
  postId: string,
  emoji: string,
  userIds: string[],
): Promise<PostSchema | undefined> {
  try {
    // Get current post with reactions
    const postResult = await query(`
      SELECT 
        p.id as post_id,
        p.title as post_title,
        p.content as post_content,
        p.created_at as post_created_at,
        p.updated_at as post_updated_at,
        p.author_id as post_author_id,
        p.is_anon as post_is_anon,
        p.total_views as post_total_views,
        p.reactions as post_reactions,
        p.community_id as post_community_id,
        u.username as user_username,
        u.avatar as user_avatar,
        u.badges as user_badges
      FROM posts p
      LEFT JOIN users u ON p.author_id = u.id
      WHERE p.id = $1
    `, [postId]);

    if (postResult.rows.length === 0) {
      return undefined;
    }

    const postRow = postResult.rows[0];
    const currentReactions = safeJsonParse(postRow.post_reactions, {});
    
    let reaction = currentReactions[emoji];
    if (!reaction) {
      return findPostById(postId);
    }
    
    // Ensure userIds is an array
    if (!Array.isArray(reaction.userIds)) {
      reaction.userIds = [];
      return findPostById(postId);
    }
    
    reaction.userIds = reaction.userIds.filter((id: string) => !userIds.includes(id));
    reaction.count = reaction.userIds.length;
    
    // If no more users, remove the reaction entirely
    if (reaction.count === 0) {
      delete currentReactions[emoji];
    } else {
      currentReactions[emoji] = reaction;
    }
    
    // Update the post in the database
    await query(`
      UPDATE posts
      SET reactions = $1
      WHERE id = $2
    `, [JSON.stringify(currentReactions), postId]);
    
    // Fetch the updated post
    return findPostById(postId);
  } catch (error) {
    console.error(`Error removing reaction from post ${postId}:`, error);
    return undefined;
  }
}
