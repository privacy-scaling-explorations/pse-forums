-- Add author_badges column to posts table
ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS author_badges JSONB DEFAULT '[]'::jsonb;

-- Add author_badges column to replies table
ALTER TABLE public.replies ADD COLUMN IF NOT EXISTS author_badges JSONB DEFAULT '[]'::jsonb; 