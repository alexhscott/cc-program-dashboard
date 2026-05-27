-- ══════════════════════════════════════════════
--  Canine Companions Program Dashboard
--  Supabase PostgreSQL Schema
--  Run this in Supabase SQL Editor → New Query
-- ══════════════════════════════════════════════

-- 1. Program data
--    One row per field value: year / month / section / region / field
CREATE TABLE IF NOT EXISTS program_data (
  id          BIGSERIAL   PRIMARY KEY,
  year        SMALLINT    NOT NULL,
  month       SMALLINT    NOT NULL CHECK (month BETWEEN 1 AND 12),
  section_id  TEXT        NOT NULL,
  region      TEXT        NOT NULL,
  field_id    TEXT        NOT NULL,
  value       INTEGER     NOT NULL DEFAULT 0,
  updated_by  TEXT,
  updated_at  TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (year, month, section_id, region, field_id)
);

CREATE INDEX IF NOT EXISTS idx_progdata_lookup
  ON program_data (year, month, section_id, region);

ALTER TABLE program_data ENABLE ROW LEVEL SECURITY;
CREATE POLICY "auth read"   ON program_data FOR SELECT TO authenticated USING (true);
CREATE POLICY "auth insert" ON program_data FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "auth update" ON program_data FOR UPDATE TO authenticated USING (true);

-- 2. Graduate log entries
CREATE TABLE IF NOT EXISTS graduate_entries (
  id              BIGSERIAL   PRIMARY KEY,
  entry_id        INTEGER     NOT NULL UNIQUE,
  first_name      TEXT        NOT NULL,
  last_name       TEXT        NOT NULL,
  middle_initial  TEXT        DEFAULT '',
  dog_name        TEXT        NOT NULL,
  category        TEXT,
  region          TEXT,
  graduation_date DATE,
  updated_by      TEXT,
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE graduate_entries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "auth read"   ON graduate_entries FOR SELECT TO authenticated USING (true);
CREATE POLICY "auth insert" ON graduate_entries FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "auth update" ON graduate_entries FOR UPDATE TO authenticated USING (true);
CREATE POLICY "auth delete" ON graduate_entries FOR DELETE TO authenticated USING (true);

-- 3. User profiles (role + region assignment)
CREATE TABLE IF NOT EXISTS user_profiles (
  id         UUID        PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email      TEXT        NOT NULL,
  full_name  TEXT,
  role_key   TEXT        CHECK (role_key IN ('pd','tm','th','br','pp','admin')),
  region     TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "users read own profile"
  ON user_profiles FOR SELECT TO authenticated USING (auth.uid() = id);
