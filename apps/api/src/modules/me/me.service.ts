import { usersMocks } from '@/shared/mocks/users.mocks';
import { query } from '../../config/database';  
export async function getUser() {
  try {
    const result = await query(
      `SELECT * FROM users WHERE uuid = $1`,
      [usersMocks[0].uuid] // TODO: Get the user id from the session
    );
    
    if (result.rows.length === 0) {
      throw new Error('User not found');
    }
    
    const userData = result.rows[0];
    
    return {
      id: userData.id,
      username: userData.username,
      email: userData.email || null,
      website: userData.website || null,
      bio: userData.bio || null,
      uuid: userData.uuid,
      avatar: userData.avatar,
      isAnon: userData.is_anon || false,
      badges: Array.isArray(userData.badges) ? userData.badges : []
    };
  } catch (error) {
    console.error('Error fetching user:', error);
    throw new Error('Failed to fetch user data');
  }
} 