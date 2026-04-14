-- Migration: Add Google OAuth support
-- Makes password_hash nullable (OAuth users have no password)
-- Adds google_id column for Google OAuth sub

ALTER TABLE "users" ALTER COLUMN "password_hash" DROP NOT NULL;
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "google_id" text UNIQUE;
