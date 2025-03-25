import { postMocks } from '@/shared/mocks/posts.mocks';
import { communityMocks } from '@/shared/mocks/community.mocks';
import { postSchema } from '@/shared/schemas/post.schema';
import { communitySchema } from '@/shared/schemas/community.schema';
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

      // Step 1: Seed communities
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

      // Step 2: Seed posts and their related data
      console.log('Seeding posts...');
      for (const mockPost of postMocks) {
        // Create or get author
        let author;
        const authorUsername = mockPost.author.username || 'anon';
        const authorKey = authorUsername.toLowerCase();
        
        if (createdUsers.has(authorKey)) {
          author = createdUsers.get(authorKey);
        } else {
          const { rows: [newAuthor] } = await client.query(
            `INSERT INTO users (username, avatar, badges, is_anon, email, uuid)
             VALUES ($1, $2, $3, $4, $5, $6)
             RETURNING id`,
            [
              mockPost.author.username || 'anonymous',
              mockPost.author.avatar || '',
              JSON.stringify(mockPost.author.badges || []),
              mockPost.author.isAnon || false,
              `${authorUsername}@example.com`,
              uuidv4() // Generate a UUID for each user
            ]
          );
          author = newAuthor;
          createdUsers.set(authorKey, author);
          console.log(`Created user: ${authorUsername} (${author.id})`);
        }

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
          `INSERT INTO posts (title, content, author_id, "group", community_id, total_views, reactions, is_anon, created_at, updated_at)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $9)
           RETURNING id`,
          [
            mockPost.title,
            mockPost.content,
            author.id,
            mockPost.group,
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
            // Create or get reply author
            let replyAuthor;
            const replyAuthorUsername = mockReply.author.username || 'anon';
            const replyAuthorKey = replyAuthorUsername.toLowerCase();

            if (createdUsers.has(replyAuthorKey)) {
              replyAuthor = createdUsers.get(replyAuthorKey);
            } else {
              const { rows: [newReplyAuthor] } = await client.query(
                `INSERT INTO users (username, avatar, badges, is_anon, email, uuid)
                 VALUES ($1, $2, $3, $4, $5, $6)
                 RETURNING id`,
                [
                  replyAuthorUsername === 'anon' ? 'anonymous' : replyAuthorUsername,
                  mockReply.author.avatar || '',
                  JSON.stringify(mockReply.author.badges || []),
                  mockReply.author.isAnon || false,
                  `${replyAuthorUsername}@example.com`,
                  uuidv4() // Generate a UUID for each user
                ]
              );
              replyAuthor = newReplyAuthor;
              createdUsers.set(replyAuthorKey, replyAuthor);
            }

            // Create reply
            const { rows: [createdReply] } = await client.query(
              `INSERT INTO replies (content, post_id, author_id, is_anon, created_at, updated_at)
               VALUES ($1, $2, $3, $4, $5, $5)
               RETURNING id`,
              [
                mockReply.content || '',
                createdPost.id,
                replyAuthor.id,
                mockReply.author.isAnon || false,
                new Date(mockReply.createdAt || new Date().toISOString())
              ]
            );

            // Handle nested replies
            if (mockReply.replies?.length) {
              for (const nestedReply of mockReply.replies) {
                let nestedAuthor;
                const nestedAuthorUsername = nestedReply.author.username || 'anon';
                const nestedAuthorKey = nestedAuthorUsername.toLowerCase();

                if (createdUsers.has(nestedAuthorKey)) {
                  nestedAuthor = createdUsers.get(nestedAuthorKey);
                } else {
                  const { rows: [newNestedAuthor] } = await client.query(
                    `INSERT INTO users (username, avatar, badges, is_anon, email, uuid)
                     VALUES ($1, $2, $3, $4, $5, $6)
                     RETURNING id`,
                    [
                      nestedAuthorUsername === 'anon' ? 'anonymous' : nestedAuthorUsername,
                      nestedReply.author.avatar || '',
                      JSON.stringify(nestedReply.author.badges || []),
                      nestedReply.author.isAnon || false,
                      `${nestedAuthorUsername}@example.com`,
                      uuidv4() // Generate a UUID for each user
                    ]
                  );
                  nestedAuthor = newNestedAuthor;
                  createdUsers.set(nestedAuthorKey, nestedAuthor);
                }

                await client.query(
                  `INSERT INTO replies (content, post_id, author_id, parent_id, is_anon, created_at, updated_at)
                   VALUES ($1, $2, $3, $4, $5, $6, $6)`,
                  [
                    nestedReply.content || '',
                    createdPost.id,
                    nestedAuthor.id,
                    createdReply.id,
                    nestedReply.author.isAnon || false,
                    new Date(nestedReply.createdAt || new Date().toISOString())
                  ]
                );
              }
            }
          }
        }
      }

      // Step 3: Add community members
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