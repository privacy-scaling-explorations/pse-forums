import { postMocks } from '@/shared/mocks/posts.mocks';
import { communityMocks } from '@/shared/mocks/community.mocks';
import { usersMocks } from '@/shared/mocks/users.mocks';
import { postSchema } from '@/shared/schemas/post.schema';
import { communitySchema } from '@/shared/schemas/community.schema';
import { userSchema } from '@/shared/schemas/user.schema';
import { pool, query } from '../config/database';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';

async function checkIfDatabaseEmpty() {
  try {
    const result = await query('SELECT COUNT(*) FROM users');
    return parseInt(result.rows[0].count) === 0;
  } catch (error) {
    console.error('Error checking if database is empty:', error);
    return true; // Assume empty if there's an error (like table doesn't exist)
  }
}

async function seedDatabase() {
  try {
    // Validate mocks data
    try {
      // Validate posts
      const postValidationResults = postMocks.map((post, index) => {
        try {
          postSchema.parse(post);
          return { valid: true, index };
        } catch (error) {
          if (error instanceof z.ZodError) {
            return { 
              valid: false, 
              index,
              errors: error.errors,
              id: post.id,
              title: post.title 
            };
          }
          return { valid: false, index, error };
        }
      });

      const invalidPosts = postValidationResults.filter(result => !result.valid);
      
      if (invalidPosts.length === 0) {
        console.log("All mock posts validated against schema");
      } else {
        console.warn(`${invalidPosts.length} mock posts failed validation, but will continue with seeding`);
        console.warn("Invalid posts:", JSON.stringify(invalidPosts, null, 2));
      }

      // Validate communities
      const communityValidationResults = communityMocks.map((community, index) => {
        try {
          communitySchema.parse(community);
          return { valid: true, index };
        } catch (error) {
          if (error instanceof z.ZodError) {
            return { 
              valid: false, 
              index,
              errors: error.errors,
              id: community.id,
              name: community.name 
            };
          }
          return { valid: false, index, error };
        }
      });

      const invalidCommunities = communityValidationResults.filter(result => !result.valid);
      
      if (invalidCommunities.length === 0) {
        console.log("All mock communities validated against schema");
      } else {
        console.warn(`${invalidCommunities.length} mock communities failed validation, but will continue with seeding`);
        console.warn("Invalid communities:", JSON.stringify(invalidCommunities, null, 2));
      }

      // Add validation for users
      const userValidationResults = usersMocks.map((user, index) => {
        try {
          userSchema.parse(user);
          return { valid: true, index };
        } catch (error) {
          if (error instanceof z.ZodError) {
            return { 
              valid: false, 
              index,
              errors: error.errors,
              id: user.id,
              username: user.username 
            };
          }
          return { valid: false, index, error };
        }
      });

      const invalidUsers = userValidationResults.filter(result => !result.valid);
      
      if (invalidUsers.length === 0) {
        console.log("All mock users validated against schema");
      } else {
        console.warn(`${invalidUsers.length} mock users failed validation, but will continue with seeding`);
        console.warn("Invalid users:", JSON.stringify(invalidUsers, null, 2));
      }
    } catch (error) {
      console.error("Mock data validation error:", error);
      console.warn("Continuing with seeding despite validation errors");
    }

    console.log('Checking database...');
    const isEmpty = await checkIfDatabaseEmpty();
    
    if (!isEmpty) {
      console.log('Database already has data, skipping seed');
      return;
    }

    console.log('Starting database seed...');

    // Track created entities to avoid duplicates
    const createdUsers = new Map();
    const createdCommunities = new Map();

    // Use a client for transaction
    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      // Step 1: Seed users first
      console.log('Seeding users...');
      for (const mockUser of usersMocks) {
        const userKey = mockUser.username.toLowerCase();
        
        const { rows: [createdUser] } = await client.query(
          `INSERT INTO users (username, avatar, badges, is_anon, email, uuid, website, bio)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
           RETURNING id`,
          [
            mockUser.username,
            mockUser.avatar || '',
            JSON.stringify(mockUser.badges || []),
            false, // isAnon
            mockUser.email || `${mockUser.username}@example.com`,
            mockUser.uuid || uuidv4(),
            mockUser.website || null,
            mockUser.bio || null
          ]
        );
        
        createdUsers.set(userKey, createdUser);
        createdUsers.set(String(mockUser.id), createdUser); // Also map by ID
        console.log(`Created user: ${mockUser.username} (${createdUser.id})`);
      }

      // Step 2: Seed communities
      console.log('Seeding communities...');
      for (const mockCommunity of communityMocks) {
        const { rows: [createdCommunity] } = await client.query(
          `INSERT INTO communities (name, description, avatar, banner, required_badges, members, created_at, updated_at)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
           RETURNING id`,
          [
            mockCommunity.name,
            mockCommunity.description,
            mockCommunity.avatar || '',
            mockCommunity.banner || '',
            JSON.stringify(mockCommunity.requiredBadges || []),
            JSON.stringify(mockCommunity.members || []),
            new Date(mockCommunity.createdAt || new Date().toISOString()),
            new Date(mockCommunity.updatedAt || new Date().toISOString())
          ]
        );
        
        // Store for reference
        createdCommunities.set(String(mockCommunity.id), createdCommunity);
        console.log(`Created community: ${mockCommunity.name} (${createdCommunity.id})`);
      }

      // Step 3: Seed posts and their related data
      console.log('Seeding posts...');
      for (const mockPost of postMocks) {
        // Handle author
        let authorId = null;
        let authorUsername = null;
        
        // If post is not anonymous and has an author with an ID
        if (!mockPost.isAnon && mockPost.author && mockPost.author.id) {
          const authorIdStr = String(mockPost.author.id);
          authorUsername = mockPost.author.username || `user_${authorIdStr}`;
          
          // Check if this author ID exists in our already created users
          if (createdUsers.has(authorIdStr)) {
            const author = createdUsers.get(authorIdStr);
            authorId = author.id;
          } else {
            // Create a default user if needed
            const { rows: [newAuthor] } = await client.query(
              `INSERT INTO users (username, avatar, badges, is_anon, email, uuid)
               VALUES ($1, $2, $3, $4, $5, $6)
               RETURNING id`,
              [
                authorUsername,
                'https://github.com/shadcn.png',
                JSON.stringify(mockPost.author.badges || []),
                false,
                `${authorUsername.toLowerCase().replace(/\s+/g, '_')}@example.com`,
                uuidv4()
              ]
            );
            authorId = newAuthor.id;
            createdUsers.set(authorIdStr, newAuthor);
            console.log(`Created default user for author ID: ${authorIdStr} (${authorId})`);
          }
        }
        // If isAnon is true, authorId and authorUsername remain null

        // Find community if associated
        let communityId = null;
        if (mockPost.community) {
          // community is a string or number (ID)
          const communityIdStr = String(mockPost.community);
          const community = createdCommunities.get(communityIdStr);
          
          if (community) {
            communityId = community.id;
          }
        }

        // Create post
        const { rows: [createdPost] } = await client.query(
          `INSERT INTO posts (title, content, author_id, community_id, total_views, reactions, is_anon, created_at, updated_at)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $8)
           RETURNING id`,
          [
            mockPost.title,
            mockPost.content,
            authorId, // Will be null for anonymous posts
            communityId,
            mockPost.totalViews || 0,
            JSON.stringify(mockPost.reactions || {}),
            mockPost.isAnon || false,
            new Date(mockPost.createdAt || new Date().toISOString())
          ]
        );
        console.log(`Created post: ${mockPost.title.substring(0, 30)}... (${createdPost.id})`);

        // Create replies
        if (mockPost.replies?.length) {
          for (const mockReply of mockPost.replies) {
            // Handle reply author
            let replyAuthorId = null;
            let replyUsername = null;
            
            // If reply has an author with an ID and is not anonymous
            if (mockReply.author && mockReply.author.id && !mockReply.author.isAnon) {
              const replyAuthorIdStr = String(mockReply.author.id);
              replyUsername = mockReply.author.username || `reply_author_${replyAuthorIdStr}`;
              
              // Check if this author ID exists in our already created users
              if (createdUsers.has(replyAuthorIdStr)) {
                const replyAuthor = createdUsers.get(replyAuthorIdStr);
                replyAuthorId = replyAuthor.id;
              } else {
                // Create a default user if needed
                const { rows: [newReplyAuthor] } = await client.query(
                  `INSERT INTO users (username, avatar, badges, is_anon, email, uuid)
                   VALUES ($1, $2, $3, $4, $5, $6)
                   RETURNING id`,
                  [
                    replyUsername,
                    'https://github.com/shadcn.png',
                    JSON.stringify(mockReply.author.badges || []),
                    false,
                    `${replyUsername.toLowerCase().replace(/\s+/g, '_')}@example.com`,
                    uuidv4()
                  ]
                );
                replyAuthorId = newReplyAuthor.id;
                createdUsers.set(replyAuthorIdStr, newReplyAuthor);
              }
            }
            // If author is anonymous, replyAuthorId and replyUsername remain null

            // Create reply
            const { rows: [createdReply] } = await client.query(
              `INSERT INTO replies (content, post_id, author_id, is_anon, created_at, updated_at)
               VALUES ($1, $2, $3, $4, $5, $5)
               RETURNING id`,
              [
                mockReply.content || '',
                createdPost.id,
                replyAuthorId,
                mockReply.author?.isAnon || false,
                new Date(mockReply.createdAt || new Date().toISOString())
              ]
            );

            // Handle nested replies
            if (mockReply.replies?.length) {
              for (const nestedReply of mockReply.replies) {
                // Handle nested reply author
                let nestedAuthorId = null;
                let nestedUsername = null;
                
                // If nested reply has an author with an ID and is not anonymous
                if (nestedReply.author && nestedReply.author.id && !nestedReply.author.isAnon) {
                  const nestedAuthorIdStr = String(nestedReply.author.id);
                  nestedUsername = nestedReply.author.username || `nested_reply_author_${nestedAuthorIdStr}`;
                  
                  // Check if this author ID exists in our already created users
                  if (createdUsers.has(nestedAuthorIdStr)) {
                    const nestedAuthor = createdUsers.get(nestedAuthorIdStr);
                    nestedAuthorId = nestedAuthor.id;
                  } else {
                    // Create a default user if needed
                    const { rows: [newNestedAuthor] } = await client.query(
                      `INSERT INTO users (username, avatar, badges, is_anon, email, uuid)
                       VALUES ($1, $2, $3, $4, $5, $6)
                       RETURNING id`,
                      [
                        nestedUsername,
                        'https://github.com/shadcn.png',
                        JSON.stringify(nestedReply.author.badges || []),
                        false,
                        `${nestedUsername.toLowerCase().replace(/\s+/g, '_')}@example.com`,
                        uuidv4()
                      ]
                    );
                    nestedAuthorId = newNestedAuthor.id;
                    createdUsers.set(nestedAuthorIdStr, newNestedAuthor);
                  }
                }
                // If author is anonymous, nestedAuthorId and nestedUsername remain null

                await client.query(
                  `INSERT INTO replies (content, post_id, author_id, parent_id, is_anon, created_at, updated_at)
                   VALUES ($1, $2, $3, $4, $5, $6, $6)`,
                  [
                    nestedReply.content || '',
                    createdPost.id,
                    nestedAuthorId,
                    createdReply.id,
                    nestedReply.author?.isAnon || false,
                    new Date(nestedReply.createdAt || new Date().toISOString())
                  ]
                );
              }
            }
          }
        }
      }

      // Step 4: Add community members
      console.log('Adding community members...');
      for (const mockCommunity of communityMocks) {
        const community = createdCommunities.get(String(mockCommunity.id));
        
        if (community && mockCommunity.members && mockCommunity.members.length > 0) {
          for (const memberId of mockCommunity.members) {
            // Find user or skip
            const memberIdStr = String(memberId);
            let member = null;
            
            // Try to find an existing user
            for (const [key, user] of createdUsers.entries()) {
              if (key.includes(memberIdStr)) {
                member = user;
                break;
              }
            }

            // If member not found in existing users, create a new user
            if (!member) {
              const { rows: [newMember] } = await client.query(
                `INSERT INTO users (username, avatar, badges, is_anon, email, uuid)
                 VALUES ($1, $2, $3, $4, $5, $6)
                 RETURNING id`,
                [
                  `member_${memberIdStr}`,
                  'https://github.com/shadcn.png',
                  '[]',
                  false,
                  `member_${memberIdStr}@example.com`,
                  uuidv4()
                ]
              );
              member = newMember;
              createdUsers.set(memberIdStr, member);
            }

            if (member) {
              // Add member to community
              await client.query(
                `INSERT INTO community_members (community_id, user_id, joined_at)
                 VALUES ($1, $2, $3)
                 ON CONFLICT (community_id, user_id) DO NOTHING`,
                [
                  community.id,
                  member.id,
                  new Date()
                ]
              );
              console.log(`Added member ${member.id} to community ${community.id}`);
            }
          }
        }
      }

      await client.query('COMMIT');
      console.log('Database seed completed successfully');
    } catch (error) {
      await client.query('ROLLBACK');
      console.error('Transaction failed, rolling back:', error);
      throw error;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
}

// Execute seed if this file is run directly
if (require.main === module) {
  seedDatabase()
    .then(() => {
      pool.end();
      process.exit(0);
    })
    .catch((error) => {
      console.error('Failed to seed database:', error);
      pool.end();
      process.exit(1);
    });
}

export { seedDatabase, checkIfDatabaseEmpty }; 