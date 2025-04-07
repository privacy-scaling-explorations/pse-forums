-- Create storage schema if it doesn't exist
CREATE SCHEMA IF NOT EXISTS storage;

-- Enable uuid-ossp extension if not enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Grant permissions on the storage schema
GRANT ALL PRIVILEGES ON SCHEMA storage TO postgres;
GRANT ALL PRIVILEGES ON SCHEMA storage TO anon;
GRANT ALL PRIVILEGES ON SCHEMA storage TO authenticated;
GRANT ALL PRIVILEGES ON SCHEMA storage TO service_role;

-- Create storage.buckets table
CREATE TABLE IF NOT EXISTS storage.buckets (
  id text NOT NULL,
  name text NOT NULL,
  owner uuid,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  public boolean DEFAULT FALSE,
  avif_autodetection boolean DEFAULT FALSE,
  file_size_limit integer,
  allowed_mime_types text[],
  CONSTRAINT buckets_pkey PRIMARY KEY (id),
  CONSTRAINT buckets_name_key UNIQUE (name)
);

-- Create storage.objects table
CREATE TABLE IF NOT EXISTS storage.objects (
  id uuid DEFAULT uuid_generate_v4() NOT NULL,
  bucket_id text,
  name text,
  owner uuid,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  last_accessed_at timestamptz DEFAULT now(),
  metadata jsonb,
  path_tokens text[] GENERATED ALWAYS AS (string_to_array(name, '/')) STORED,
  CONSTRAINT objects_pkey PRIMARY KEY (id),
  CONSTRAINT objects_bucketid_name_key UNIQUE (bucket_id, name),
  CONSTRAINT objects_buckets_fkey FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id) ON DELETE CASCADE
);

-- Grant permissions on the tables
GRANT ALL PRIVILEGES ON TABLE storage.buckets TO postgres;
GRANT ALL PRIVILEGES ON TABLE storage.buckets TO anon;
GRANT ALL PRIVILEGES ON TABLE storage.buckets TO authenticated;
GRANT ALL PRIVILEGES ON TABLE storage.buckets TO service_role;

GRANT ALL PRIVILEGES ON TABLE storage.objects TO postgres;
GRANT ALL PRIVILEGES ON TABLE storage.objects TO anon;
GRANT ALL PRIVILEGES ON TABLE storage.objects TO authenticated;
GRANT ALL PRIVILEGES ON TABLE storage.objects TO service_role;

-- Enable Row Level Security
ALTER TABLE storage.buckets ENABLE ROW LEVEL SECURITY;
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Create default policies
CREATE POLICY "Public buckets are viewable by everyone." ON storage.buckets
  FOR SELECT USING (public = true);

CREATE POLICY "Users can insert their own objects." ON storage.objects
  FOR INSERT WITH CHECK (bucket_id IN (
    SELECT id FROM storage.buckets WHERE public = true
  ));

CREATE POLICY "Public objects are viewable by everyone." ON storage.objects
  FOR SELECT USING (bucket_id IN (
    SELECT id FROM storage.buckets WHERE public = true
  ));

-- Create public bucket
INSERT INTO storage.buckets (id, name, public) 
VALUES ('public', 'public', true)
ON CONFLICT (id) DO NOTHING; 