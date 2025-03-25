import { PostSchema, postSchema } from '@/shared/schemas/post.schema';
import { query } from '../../config/database';
import { postMocks } from '@/shared/mocks/posts.mocks';
import { z } from 'zod';
import { formatPostDbRow } from './posts.helpers';

export async function findAllPosts(): Promise<PostSchema[]> {
  try {
    const result = await query(`
      SELECT 
        p.*,
        u.id as user_id,
        u.username,
        u.avatar,
        u.badges,
        u.is_anon as user_is_anon,
        c.id as community_id,
        c.name as community_name,
        c.description as community_description,
        c.avatar as community_avatar,
        c.banner as community_banner,
        c.required_badges as community_required_badges,
        c.members as community_members,
        c.created_at as community_created_at,
        c.updated_at as community_updated_at
      FROM posts p
      JOIN users u ON p.author_id = u.id
      LEFT JOIN communities c ON p.community_id = c.id
      ORDER BY p.created_at DESC
    `);

    const posts: PostSchema[] = await Promise.all(result.rows.map(async (post) => {
      // Fetch replies for each post
      const repliesResult = await query(`
        SELECT 
          r.*,
          u.id as user_id,
          u.username,
          u.avatar,
          u.badges,
          u.is_anon as user_is_anon
        FROM replies r
        JOIN users u ON r.author_id = u.id
        WHERE r.post_id = $1
        ORDER BY r.created_at ASC
      `, [post.id]);

      return formatPostDbRow(post, repliesResult.rows);
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
        p.*,
        u.id as user_id,
        u.username,
        u.avatar,
        u.badges,
        u.is_anon as user_is_anon,
        c.id as community_id,
        c.name as community_name,
        c.description as community_description,
        c.avatar as community_avatar,
        c.banner as community_banner,
        c.required_badges as community_required_badges,
        c.members as community_members,
        c.created_at as community_created_at,
        c.updated_at as community_updated_at
      FROM posts p
      JOIN users u ON p.author_id = u.id
      LEFT JOIN communities c ON p.community_id = c.id
      WHERE p.id = $1
    `, [id]);

    // If no post found, return undefined
    if (result.rows.length === 0) {
      return undefined;
    }

    const post = result.rows[0];

    // Fetch replies for the post
    const repliesResult = await query(`
      SELECT 
        r.*,
        u.id as user_id,
        u.username,
        u.avatar,
        u.badges,
        u.is_anon as user_is_anon
      FROM replies r
      JOIN users u ON r.author_id = u.id
      WHERE r.post_id = $1
      ORDER BY r.created_at ASC
    `, [post.id]);

    return formatPostDbRow(post, repliesResult.rows);
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
        p.*,
        u.id as user_id,
        u.username,
        u.avatar,
        u.badges,
        u.is_anon as user_is_anon
      FROM posts p
      JOIN users u ON p.author_id = u.id
      WHERE p.id = $1
    `, [postId]);

    if (postResult.rows.length === 0) {
      return undefined;
    }

    const post = postResult.rows[0];
    const currentReactions = post.reactions || {};
    
    let reaction = currentReactions[emoji];
    if (!reaction) {
      reaction = {
        emoji,
        count: 0,
        userIds: []
      };
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
    
    const repliesResult = await query(`
      SELECT 
        r.*,
        u.id as user_id,
        u.username,
        u.avatar,
        u.badges,
        u.is_anon as user_is_anon
      FROM replies r
      JOIN users u ON r.author_id = u.id
      WHERE r.post_id = $1
      ORDER BY r.created_at ASC
    `, [postId]);
    
    return formatPostDbRow(post, repliesResult.rows);
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
        p.*,
        u.id as user_id,
        u.username,
        u.avatar,
        u.badges,
        u.is_anon as user_is_anon
      FROM posts p
      JOIN users u ON p.author_id = u.id
      WHERE p.id = $1
    `, [postId]);

    if (postResult.rows.length === 0) {
      return undefined;
    }

    const post = postResult.rows[0];
    const currentReactions = post.reactions || {};
    
    let reaction = currentReactions[emoji];
    if (!reaction) {
      return formatPostDbRow(post, []);
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
    
    // Fetch replies for complete post data
    const repliesResult = await query(`
      SELECT 
        r.*,
        u.id as user_id,
        u.username,
        u.avatar,
        u.badges,
        u.is_anon as user_is_anon
      FROM replies r
      JOIN users u ON r.author_id = u.id
      WHERE r.post_id = $1
      ORDER BY r.created_at ASC
    `, [postId]);
    
    return formatPostDbRow(post, repliesResult.rows);
  } catch (error) {
    console.error(`Error removing reaction from post ${postId}:`, error);
    return undefined;
  }
}
