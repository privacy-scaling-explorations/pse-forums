import { pool } from '../config/database';

// Add debug logs
console.log('Process environment:', {
  NODE_ENV: process.env.NODE_ENV,
  DATABASE_URL: process.env.DATABASE_URL,
});

const createTables = `
  -- Enable UUID extension
  CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

  -- Drop tables if they exist to avoid conflicts
  DROP TABLE IF EXISTS community_members CASCADE;
  DROP TABLE IF EXISTS replies CASCADE;
  DROP TABLE IF EXISTS posts CASCADE;
  DROP TABLE IF EXISTS badges CASCADE;
  DROP TABLE IF EXISTS communities CASCADE;
  DROP TABLE IF EXISTS users CASCADE;
  
  -- Drop function
  DROP FUNCTION IF EXISTS update_modified_column();

  -- Create trigger function for automatically updating updated_at columns
  CREATE OR REPLACE FUNCTION update_modified_column()
  RETURNS TRIGGER AS $$
  BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
  END;
  $$ LANGUAGE plpgsql;

  -- Users table (based on user.schema.ts)
  CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username TEXT NOT NULL,
    avatar TEXT NOT NULL,
    badges JSONB DEFAULT '[]',
    is_anon BOOLEAN DEFAULT FALSE,
    email TEXT,
    uuid TEXT NOT NULL,
    website TEXT,
    bio TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
  );

  -- Communities table (based on community.schema.ts)
  CREATE TABLE IF NOT EXISTS communities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    avatar TEXT,
    banner TEXT,
    required_badges JSONB DEFAULT '[]' NOT NULL,
    members JSONB DEFAULT '[]',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
  );

  -- Posts table (based on post.schema.ts)
  CREATE TABLE IF NOT EXISTS posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    author_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    "group" TEXT NOT NULL,
    community_id UUID REFERENCES communities(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    total_views INTEGER DEFAULT 0,
    reactions JSONB DEFAULT '{}',
    is_anon BOOLEAN DEFAULT FALSE
  );

  -- Replies table (based on post.schema.ts postReplySchema)
  CREATE TABLE IF NOT EXISTS replies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    content TEXT NOT NULL,
    post_id UUID REFERENCES posts(id) ON DELETE CASCADE NOT NULL,
    author_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    parent_id UUID REFERENCES replies(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    is_anon BOOLEAN DEFAULT FALSE
  );

  -- Community members (many-to-many relationship)
  CREATE TABLE IF NOT EXISTS community_members (
    community_id UUID REFERENCES communities(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    PRIMARY KEY (community_id, user_id)
  );

  -- Badges table (based on badge.schema.ts)
  CREATE TABLE IF NOT EXISTS badges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
  );

  -- Create triggers for each table to automatically update the updated_at column
  CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_modified_column();
  CREATE TRIGGER update_communities_updated_at BEFORE UPDATE ON communities FOR EACH ROW EXECUTE FUNCTION update_modified_column();
  CREATE TRIGGER update_posts_updated_at BEFORE UPDATE ON posts FOR EACH ROW EXECUTE FUNCTION update_modified_column();
  CREATE TRIGGER update_replies_updated_at BEFORE UPDATE ON replies FOR EACH ROW EXECUTE FUNCTION update_modified_column();
  CREATE TRIGGER update_badges_updated_at BEFORE UPDATE ON badges FOR EACH ROW EXECUTE FUNCTION update_modified_column();
  
  -- Indexes for performance
  CREATE INDEX IF NOT EXISTS idx_posts_author ON posts(author_id);
  CREATE INDEX IF NOT EXISTS idx_posts_group ON posts("group");
  CREATE INDEX IF NOT EXISTS idx_posts_community ON posts(community_id);
  CREATE INDEX IF NOT EXISTS idx_replies_post ON replies(post_id);
  CREATE INDEX IF NOT EXISTS idx_replies_author ON replies(author_id);
  CREATE INDEX IF NOT EXISTS idx_replies_parent ON replies(parent_id);
  CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
  CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at);
  CREATE INDEX IF NOT EXISTS idx_replies_created_at ON replies(created_at);
  CREATE INDEX IF NOT EXISTS idx_communities_name ON communities(name);
  CREATE INDEX IF NOT EXISTS idx_badges_name ON badges(name);
`;

async function migrate() {
  try {
    await pool.query(createTables);
    console.log('Migration completed successfully');
  } catch (error) {
    console.error('Migration failed:', error);
    throw error;
  } finally {
    await pool.end();
  }
}

// Run migration if this file is executed directly
if (require.main === module) {
  migrate()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
} 

export { migrate }; 