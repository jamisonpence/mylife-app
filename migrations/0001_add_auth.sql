-- Migration: Add users, profiles tables and user_id to all data tables
-- Run after: 0000_initial_postgres_schema.sql

-- 1. Create users table
CREATE TABLE IF NOT EXISTS "users" (
  "id" serial PRIMARY KEY,
    "email" text NOT NULL UNIQUE,
      "password_hash" text NOT NULL,
        "created_at" timestamp NOT NULL DEFAULT now()
        );

        -- 2. Create profiles table
        CREATE TABLE IF NOT EXISTS "profiles" (
          "id" serial PRIMARY KEY,
            "user_id" integer NOT NULL UNIQUE,
              "display_name" text,
                "bio" text,
                  "avatar_url" text,
                    "updated_at" timestamp NOT NULL DEFAULT now()
                    );

                    -- 3. Add user_id columns to all data tables
                    --    Using a default user id approach for existing data:
                    --    All existing rows will be assigned to user id 1 (first user created)

                    ALTER TABLE "events" ADD COLUMN IF NOT EXISTS "user_id" integer NOT NULL DEFAULT 1;
                    ALTER TABLE "tasks" ADD COLUMN IF NOT EXISTS "user_id" integer NOT NULL DEFAULT 1;
                    ALTER TABLE "books" ADD COLUMN IF NOT EXISTS "user_id" integer NOT NULL DEFAULT 1;
                    ALTER TABLE "reading_sessions" ADD COLUMN IF NOT EXISTS "user_id" integer NOT NULL DEFAULT 1;
                    ALTER TABLE "workout_templates" ADD COLUMN IF NOT EXISTS "user_id" integer NOT NULL DEFAULT 1;
                    ALTER TABLE "workout_logs" ADD COLUMN IF NOT EXISTS "user_id" integer NOT NULL DEFAULT 1;
                    ALTER TABLE "goals" ADD COLUMN IF NOT EXISTS "user_id" integer NOT NULL DEFAULT 1;
                    ALTER TABLE "goal_tasks" ADD COLUMN IF NOT EXISTS "user_id" integer NOT NULL DEFAULT 1;
                    ALTER TABLE "projects" ADD COLUMN IF NOT EXISTS "user_id" integer NOT NULL DEFAULT 1;
                    ALTER TABLE "project_tasks" ADD COLUMN IF NOT EXISTS "user_id" integer NOT NULL DEFAULT 1;
                    ALTER TABLE "general_tasks" ADD COLUMN IF NOT EXISTS "user_id" integer NOT NULL DEFAULT 1;
                    ALTER TABLE "recipes" ADD COLUMN IF NOT EXISTS "user_id" integer NOT NULL DEFAULT 1;
                    ALTER TABLE "week_plan" ADD COLUMN IF NOT EXISTS "user_id" integer NOT NULL DEFAULT 1;
                    ALTER TABLE "grocery_checks" ADD COLUMN IF NOT EXISTS "user_id" integer NOT NULL DEFAULT 1;
                    ALTER TABLE "relationship_groups" ADD COLUMN IF NOT EXISTS "user_id" integer NOT NULL DEFAULT 1;
                    ALTER TABLE "people" ADD COLUMN IF NOT EXISTS "user_id" integer NOT NULL DEFAULT 1;
                    