import { query } from '../../config/database';
import { usersMocks } from '@/shared/mocks/users.mocks';

export async function getCurrentUser() {
  try {
    const result = await query(
      `SELECT 
        id,
        username,
        email,
        website,
        bio,
        uuid,
        avatar,
        is_anon,
        badges
      FROM users 
      WHERE uuid = $1 
      LIMIT 1`,
      [usersMocks[0].uuid]
    );
    
    console.log(`Found ${result.rows.length} current user records`);
    
    if (result.rows.length === 0) {
      return null;
    }
    
    const userData = result.rows[0];
    return formatUserData(userData);
  } catch (error) {
    console.error(`Error fetching current user: ${error instanceof Error ? error.message : 'Unknown error'}`);
    return null;
  }
}


export async function getUserByUsername(username: any) {
  // Check if username is a valid string
  if (!username || typeof username !== 'string') {
    console.error('Invalid username parameter:', typeof username);
    return null;
  }
  
  try {
    const result = await query(
      `SELECT 
        id,
        username,
        email,
        website,
        bio,
        uuid,
        avatar,
        is_anon,
        badges,
        created_at
      FROM users 
      WHERE username = $1 
      LIMIT 1`,
      [username]
    );
    
    console.log(`Found ${result.rows.length} users matching username: ${username}`);
    
    if (result.rows.length === 0) {
      return null;
    }
    
    const userData = result.rows[0];
    return formatUserData(userData);
  } catch (error) {
    // Safely log error without including circular references
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error(`Error fetching user with username ${typeof username === 'string' ? username : '[invalid]'}: ${errorMessage}`);
    return null;
  }
}

export async function getUserById(id: string) {
  if (!id) {
    console.error('User ID is required');
    return null;
  }
  
  try {
    const result = await query(
      `SELECT 
        id,
        username,
        email,
        website,
        bio,
        uuid,
        avatar,
        is_anon,
        badges
      FROM users 
      WHERE id = $1 
      LIMIT 1`,
      [id]
    );
    
    console.log(`Found ${result.rows.length} users matching ID: ${id}`);
    
    if (result.rows.length === 0) {
      return null;
    }
    
    const userData = result.rows[0];
    return formatUserData(userData);
  } catch (error) {
    console.error(`Error fetching user with ID ${id}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    return null;
  }
}

function formatUserData(userData: any) {
  return {
    id: userData.id,
    username: userData.username,
    email: userData.email || null,
    website: userData.website || null,
    bio: userData.bio || null,
    uuid: userData.uuid,
    avatar: userData.avatar,
    isAnon: userData.is_anon || false,
    badges: Array.isArray(userData.badges) ? userData.badges : [],
    createdAt: userData.created_at,
  };
} 