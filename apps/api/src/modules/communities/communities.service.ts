import { CommunitySchema } from '@/shared/schemas/community.schema';
import { query } from '../../config/database';


function formatCommunityFromDb(community: any, members: any[] = []): CommunitySchema {
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
    // Fetch the community
    const communityResult = await query(`
      SELECT * FROM communities
      WHERE id = $1
    `, [id]);

    if (communityResult.rows.length === 0) {
      return null;
    }

    const community = communityResult.rows[0];

    // Fetch community members
    const membersResult = await query(`
      SELECT user_id FROM community_members
      WHERE community_id = $1
    `, [id]);

    // Fetch posts for this community
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

    // Format community with members
    const formattedCommunity = formatCommunityFromDb(community, membersResult.rows);
    
    return formattedCommunity;
  } catch (error) {
    console.error(`Error finding community by ID ${id}:`, error);
    throw new Error(`Failed to fetch community with ID ${id}`);
  }
} 