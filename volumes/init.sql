-- Create required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE EXTENSION IF NOT EXISTS pgjwt;

-- Create roles required by Supabase
DO
$do$
BEGIN
   IF NOT EXISTS (
      SELECT FROM pg_catalog.pg_roles
      WHERE  rolname = 'anon') THEN
      CREATE ROLE anon NOLOGIN;
   END IF;
   IF NOT EXISTS (
      SELECT FROM pg_catalog.pg_roles
      WHERE  rolname = 'authenticated') THEN
      CREATE ROLE authenticated NOLOGIN;
   END IF;
   IF NOT EXISTS (
      SELECT FROM pg_catalog.pg_roles
      WHERE  rolname = 'service_role') THEN
      CREATE ROLE service_role NOLOGIN;
   END IF;
END
$do$;

-- Grant appropriate privileges to roles
GRANT anon TO postgres;
GRANT authenticated TO postgres;
GRANT service_role TO postgres;

-- Setup realtime replication
DROP PUBLICATION IF EXISTS supabase_realtime;
CREATE PUBLICATION supabase_realtime;

ALTER PUBLICATION supabase_realtime OWNER TO postgres;

-- Setup replication slot for Realtime 
DO $$
BEGIN
  PERFORM pg_create_logical_replication_slot('supabase_realtime_rls', 'pgoutput');
EXCEPTION WHEN duplicate_object THEN
  NULL;
END $$;

-- Create Storage schema if needed
CREATE SCHEMA IF NOT EXISTS storage;
GRANT ALL ON SCHEMA storage TO postgres;
GRANT USAGE ON SCHEMA storage TO anon, authenticated, service_role; 