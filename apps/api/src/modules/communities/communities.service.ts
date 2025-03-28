import { CommunitySchema } from '@/shared/schemas/community.schema';
import { query } from '../../config/database';
import { PostSchema } from '@/shared/schemas/post.schema';
import { formatPostDbRow, formatReplyDbRow } from '../posts/posts.helpers';
import { getUserById } from '../users/users.service';


export async function getPostsByCommunityId(id: string): Promise<PostSchema[]> {
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
      WHERE p.community_id = $1
      ORDER BY p.created_at DESC
    `, [id]);

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
      
      const formattedReplies = repliesResult.rows.map(reply => 
        formatReplyDbRow(reply)
      );
      
      const replyMap = new Map<string, any>();
      const topLevelReplies: any[] = [];
      
      formattedReplies.forEach(reply => {
        replyMap.set(reply.id, { ...reply, replies: [] });
      });
      
      formattedReplies.forEach(reply => {
        if (reply.parentId) {
          const parentReply = replyMap.get(reply.parentId);
          if (parentReply) {
            parentReply.replies.push(replyMap.get(reply.id));
          }
        } else {
          topLevelReplies.push(replyMap.get(reply.id));
        }
      });
      
      post.replies = topLevelReplies as any[];
      return post as unknown as PostSchema;
    }));

    return posts;
  } catch (error) {
    console.error(`Error fetching posts for community ${id}:`, error);
    return [];
  }
} 

const formatCommunityFromDb = (community: any, members: any[] = []): CommunitySchema => {
  return {
    id: community.id,
    name: community.name,
    description: community.description,
    avatar: community.avatar || '',
    banner: community.banner || '',
    requiredBadges: community.required_badges || [],
    members: members.map(member => member.user_id),
    createdAt: community.created_at,
    updatedAt: community.updated_at,
  };
}

export async function findAllCommunities(): Promise<CommunitySchema[]> {
  try {
    // Fetch all communities
    const communitiesResult = await query(`
      SELECT * FROM communities
      ORDER BY created_at DESC
    `);

    // For each community, fetch its members
    const communities = await Promise.all(communitiesResult.rows.map(async (community) => {
      const membersResult = await query(`
        SELECT user_id FROM community_members
        WHERE community_id = $1
      `, [community.id]);
      
      return formatCommunityFromDb(community, membersResult.rows);
    }));

    return communities;
  } catch (error) {
    console.error('Error finding all communities:', error);
    throw new Error('Failed to fetch communities from database');
  }
}

export async function findCommunityById(id: string): Promise<CommunitySchema | null> {
  try {
    const communityResult = await query(`
      SELECT * FROM communities
      WHERE id = $1
    `, [id]);

    if (communityResult.rows.length === 0) {
      return null;
    }

    const community = communityResult.rows[0];

    const membersResult = await query(`
      SELECT user_id FROM community_members
      WHERE community_id = $1
    `, [id]);

    const postsResult = await query(`
      SELECT 
        p.*,
        u.id as author_id,
        u.username as author_username,
        u.avatar as author_avatar,
        u.badges as author_badges,
        u.is_anon as author_is_anon
      FROM posts p
      JOIN users u ON p.author_id = u.id
      WHERE p.community_id = $1
      ORDER BY p.created_at DESC
    `, [id]);

    const formattedCommunity = formatCommunityFromDb(community, membersResult.rows);
    
    return formattedCommunity;
  } catch (error) {
    console.error(`Error finding community by ID ${id}:`, error);
    throw new Error(`Failed to fetch community with ID ${id}`);
  }
} 

export async function joinCommunity(userId: string, communityId: string): Promise<{ success: boolean; message: string; }> {
  try {
    const communityResult = await query(
      `SELECT * FROM communities WHERE id = $1`,
      [communityId]
    );
    
    if (communityResult.rows.length === 0) {
      return { success: false, message: 'Community not found' };
    }
    
    const community = communityResult.rows[0];
    
    const user = await getUserById(userId);
    if (!user) {
      return { success: false, message: 'User not found' };
    }
    
    const membershipResult = await query(
      `SELECT * FROM community_members WHERE community_id = $1 AND user_id = $2`,
      [communityId, userId]
    );
    
    if (membershipResult.rows.length > 0) {
      return { success: false, message: 'User is already a member of this community' };
    }
    
    const requiredBadges = community.required_badges || [];
    if (requiredBadges.length > 0) {
      const userBadges = user.badges || [];
      const userBadgeIds = userBadges.map((badge: any) => badge.id);
      
      const requiredBadgeIds = requiredBadges.map((badge: any) => String(badge));
      const userBadgeIdsStr = userBadgeIds.map((id: any) => String(id));
      
      const missingBadges = requiredBadgeIds.filter(
        (badgeId: string) => !userBadgeIdsStr.includes(badgeId)
      );
      
      if (missingBadges.length > 0) {
        return { 
          success: false, 
          message: `User doesn't have the required badges to join this community. Missing badges: ${missingBadges.join(', ')}` 
        };
      }
    }
    
    await query(
      `INSERT INTO community_members (community_id, user_id, joined_at)
       VALUES ($1, $2, $3)`,
      [communityId, userId, new Date()]
    );
    
    return { success: true, message: 'Successfully joined the community' };
  } catch (error) {
    console.error(`Error joining community ${communityId}:`, error);
    throw new Error('Failed to join community');
  }
} 

export async function getUserCommunities(userId: string): Promise<CommunitySchema[]> {
  try {
    const result = await query(`
      SELECT 
        c.*,
        cm.joined_at
      FROM communities c
      JOIN community_members cm ON c.id = cm.community_id
      WHERE cm.user_id = $1
      ORDER BY cm.joined_at DESC
    `, [userId]);

    const communities = await Promise.all(result.rows.map(async (community) => {
      const membersResult = await query(`
        SELECT user_id FROM community_members
        WHERE community_id = $1
      `, [community.id]);
      
      return formatCommunityFromDb(community, membersResult.rows);
    }));

    return communities;
  } catch (error) {
    console.error(`Error fetching communities for user ${userId}:`, error);
    return [];
  }
} 