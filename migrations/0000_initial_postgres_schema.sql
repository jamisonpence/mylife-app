-- Initial Postgres migration: created from shared/schema.ts
-- Run with: npm run db:migrate

CREATE TABLE IF NOT EXISTS "events" (
    "id" serial PRIMARY KEY,
    "title" text NOT NULL,
    "date" text NOT NULL,
    "end_date" text,
    "category" text NOT NULL DEFAULT 'other',
    "recurring" text NOT NULL DEFAULT 'none',
    "description" text,
    "color" text
  );

CREATE TABLE IF NOT EXISTS "tasks" (
    "id" serial PRIMARY KEY,
    "event_id" integer NOT NULL,
    "title" text NOT NULL,
    "completed" boolean NOT NULL DEFAULT false,
    "due_date" text,
    "notes" text,
    "sort_order" integer NOT NULL DEFAULT 0
  );

CREATE TABLE IF NOT EXISTS "books" (
    "id" serial PRIMARY KEY,
    "title" text NOT NULL,
    "author" text,
    "status" text NOT NULL DEFAULT 'backlog',
    "total_pages" integer,
    "current_page" integer NOT NULL DEFAULT 0,
    "start_date" text,
    "finish_date" text,
    "notes" text,
    "cover_url" text,
    "genre" text,
    "rating" integer,
    "sort_order" integer NOT NULL DEFAULT 0
  );

CREATE TABLE IF NOT EXISTS "reading_sessions" (
    "id" serial PRIMARY KEY,
    "book_id" integer NOT NULL,
    "date" text NOT NULL,
    "pages_read" integer NOT NULL DEFAULT 0,
    "duration_minutes" integer,
    "notes" text,
    "planned" boolean NOT NULL DEFAULT false,
    "completed" boolean NOT NULL DEFAULT false,
    "recurring" text NOT NULL DEFAULT 'none'
  );

CREATE TABLE IF NOT EXISTS "workout_templates" (
    "id" serial PRIMARY KEY,
    "name" text NOT NULL,
    "workout_type" text NOT NULL DEFAULT 'custom',
    "scheduled_day" text,
    "recurring" text NOT NULL DEFAULT 'none',
    "notes" text,
    "linked_goal_id" integer,
    "exercises_json" text NOT NULL DEFAULT '[]'
  );

CREATE TABLE IF NOT EXISTS "workout_logs" (
    "id" serial PRIMARY KEY,
    "template_id" integer,
    "date" text NOT NULL,
    "name" text NOT NULL,
    "workout_type" text NOT NULL DEFAULT 'custom',
    "duration_minutes" integer,
    "notes" text,
    "completed" boolean NOT NULL DEFAULT false,
    "exercises_json" text NOT NULL DEFAULT '[]',
    "linked_goal_id" integer
  );

CREATE TABLE IF NOT EXISTS "goals" (
    "id" serial PRIMARY KEY,
    "title" text NOT NULL,
    "category" text NOT NULL DEFAULT 'general',
    "progress_type" text NOT NULL DEFAULT 'percent',
    "progress_current" real NOT NULL DEFAULT 0,
    "progress_target" real NOT NULL DEFAULT 100,
    "priority" text NOT NULL DEFAULT 'medium',
    "start_date" text,
    "target_date" text,
    "recurring" text NOT NULL DEFAULT 'none',
    "description" text,
    "linked_book_id" integer,
    "linked_template_id" integer
  );

CREATE TABLE IF NOT EXISTS "goal_tasks" (
    "id" serial PRIMARY KEY,
    "goal_id" integer NOT NULL,
    "title" text NOT NULL,
    "completed" boolean NOT NULL DEFAULT false,
    "due_date" text,
    "notes" text,
    "sort_order" integer NOT NULL DEFAULT 0
  );

CREATE TABLE IF NOT EXISTS "projects" (
    "id" serial PRIMARY KEY,
    "goal_id" integer,
    "title" text NOT NULL,
    "status" text NOT NULL DEFAULT 'not_started',
    "due_date" text,
    "description" text,
    "sort_order" integer NOT NULL DEFAULT 0
  );

CREATE TABLE IF NOT EXISTS "project_tasks" (
    "id" serial PRIMARY KEY,
    "project_id" integer NOT NULL,
    "title" text NOT NULL,
    "completed" boolean NOT NULL DEFAULT false,
    "due_date" text,
    "priority" text NOT NULL DEFAULT 'medium',
    "notes" text,
    "sort_order" integer NOT NULL DEFAULT 0
  );

CREATE TABLE IF NOT EXISTS "week_plan" (
    "id" serial PRIMARY KEY,
    "day_index" integer NOT NULL,
    "recipe_id" integer NOT NULL,
    "week_start" text NOT NULL
  );

CREATE TABLE IF NOT EXISTS "recipes" (
    "id" serial PRIMARY KEY,
    "name" text NOT NULL,
    "ingredients" text NOT NULL DEFAULT '[]',
    "instructions" text,
    "prep_time" integer,
    "cook_time" integer,
    "servings" integer,
    "calories" integer,
    "notes" text,
    "category" text,
    "image_url" text
  );

CREATE TABLE IF NOT EXISTS "grocery_checks" (
    "id" serial PRIMARY KEY,
    "week_start" text NOT NULL,
    "item_key" text NOT NULL,
    "checked" boolean NOT NULL DEFAULT false
  );

CREATE TABLE IF NOT EXISTS "relationship_groups" (
    "id" serial PRIMARY KEY,
    "name" text NOT NULL,
    "color" text,
    "description" text,
    "sort_order" integer NOT NULL DEFAULT 0
  );

CREATE TABLE IF NOT EXISTS "people" (
    "id" serial PRIMARY KEY,
    "name" text NOT NULL,
    "group_id" integer,
    "relationship" text,
    "birthday" text,
    "notes" text,
    "spouse_id" integer,
    "children_json" text NOT NULL DEFAULT '[]',
    "birthday_event_id" integer,
    "sort_order" integer NOT NULL DEFAULT 0
  );

CREATE TABLE IF NOT EXISTS "general_tasks" (
    "id" serial PRIMARY KEY,
    "title" text NOT NULL,
    "completed" boolean NOT NULL DEFAULT false,
    "due_date" text,
    "priority" text NOT NULL DEFAULT 'medium',
    "notes" text,
    "sort_order" integer NOT NULL DEFAULT 0
  );
