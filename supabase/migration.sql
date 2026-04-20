-- =============================================================
-- Paco Portfolio — Migration for EXISTING Supabase tables
-- Run this in: Supabase Dashboard > SQL Editor > New Query
-- =============================================================

-- 1. Add missing columns to "messages" table
ALTER TABLE messages
  ADD COLUMN IF NOT EXISTS project_type text NOT NULL DEFAULT 'Fotografía',
  ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'new';

-- Add check constraint for status (skip if already exists)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'messages_status_check'
  ) THEN
    ALTER TABLE messages
      ADD CONSTRAINT messages_status_check
      CHECK (status IN ('new', 'read', 'archived'));
  END IF;
END $$;

-- 2. Add missing columns to "projects" table (if needed)
ALTER TABLE projects
  ADD COLUMN IF NOT EXISTS location text DEFAULT 'Por definir',
  ADD COLUMN IF NOT EXISTS format text,
  ADD COLUMN IF NOT EXISTS summary text,
  ADD COLUMN IF NOT EXISTS description text,
  ADD COLUMN IF NOT EXISTS services jsonb DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS cover_image text,
  ADD COLUMN IF NOT EXISTS gallery jsonb DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS metrics jsonb DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS created_at timestamptz DEFAULT now();

-- 3. Enable RLS on all tables
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_stats ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies (wrapped in DO blocks to skip if they already exist)

-- Messages: anyone can insert (contact form), authenticated can read/update
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Anyone can send a message' AND tablename = 'messages') THEN
    CREATE POLICY "Anyone can send a message" ON messages FOR INSERT TO anon, authenticated WITH CHECK (true);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Auth users can view messages' AND tablename = 'messages') THEN
    CREATE POLICY "Auth users can view messages" ON messages FOR SELECT TO authenticated USING (true);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Auth users can update messages' AND tablename = 'messages') THEN
    CREATE POLICY "Auth users can update messages" ON messages FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
  END IF;
END $$;

-- Projects: anyone can view published, authenticated can manage
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Anyone can view published projects' AND tablename = 'projects') THEN
    CREATE POLICY "Anyone can view published projects" ON projects FOR SELECT TO anon, authenticated USING (published = true OR auth.role() = 'authenticated');
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Auth users can insert projects' AND tablename = 'projects') THEN
    CREATE POLICY "Auth users can insert projects" ON projects FOR INSERT TO authenticated WITH CHECK (true);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Auth users can update projects' AND tablename = 'projects') THEN
    CREATE POLICY "Auth users can update projects" ON projects FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Auth users can delete projects' AND tablename = 'projects') THEN
    CREATE POLICY "Auth users can delete projects" ON projects FOR DELETE TO authenticated USING (true);
  END IF;
END $$;

-- Site stats: anyone can read, authenticated can modify
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Anyone can view site stats' AND tablename = 'site_stats') THEN
    CREATE POLICY "Anyone can view site stats" ON site_stats FOR SELECT TO anon, authenticated USING (true);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Auth users can update site stats' AND tablename = 'site_stats') THEN
    CREATE POLICY "Auth users can update site stats" ON site_stats FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
  END IF;
END $$;
