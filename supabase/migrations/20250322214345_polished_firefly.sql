/*
  # Initial Schema for Bucket Hero

  1. New Tables
    - users
      - Custom user data and profile information
    - bucket_items
      - User's bucket list items with privacy settings
    - categories
      - Predefined categories for bucket list items
    - friendships
      - User connections and friend relationships
    - team_ups
      - Shared bucket list items between friends
    - rewards
      - Bucket Bucks tracking and history

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create difficulty level type (privacy_level already exists)
CREATE TYPE difficulty_level AS ENUM ('easy', 'medium', 'hard');

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  icon text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  username text UNIQUE NOT NULL,
  avatar_url text,
  bucket_bucks integer DEFAULT 0,
  streak_days integer DEFAULT 0,
  last_login timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Create bucket items table
CREATE TABLE IF NOT EXISTS bucket_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) NOT NULL,
  category_id uuid REFERENCES categories(id),
  title text NOT NULL,
  description text,
  difficulty difficulty_level DEFAULT 'medium',
  estimated_completion_time interval,
  projected_completion_date date,
  completed boolean DEFAULT false,
  completion_photo_url text,
  completed_at timestamptz,
  privacy_level privacy_level DEFAULT 'private',
  created_at timestamptz DEFAULT now()
);

-- Create friendships table
CREATE TABLE IF NOT EXISTS friendships (
  user_id1 uuid REFERENCES users(id) NOT NULL,
  user_id2 uuid REFERENCES users(id) NOT NULL,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (user_id1, user_id2)
);

-- Create team_ups table
CREATE TABLE IF NOT EXISTS team_ups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  bucket_item_id uuid REFERENCES bucket_items(id) NOT NULL,
  user_id uuid REFERENCES users(id) NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(bucket_item_id, user_id)
);

-- Create rewards table
CREATE TABLE IF NOT EXISTS rewards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) NOT NULL,
  amount integer NOT NULL,
  reason text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE bucket_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE friendships ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_ups ENABLE ROW LEVEL SECURITY;
ALTER TABLE rewards ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can read own bucket items"
  ON bucket_items
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own bucket items"
  ON bucket_items
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own bucket items"
  ON bucket_items
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can delete own bucket items"
  ON bucket_items
  FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can read friendships they're part of"
  ON friendships
  FOR SELECT
  TO authenticated
  USING (
    user_id1 = auth.uid() OR
    user_id2 = auth.uid()
  );

CREATE POLICY "Users can create friendship requests"
  ON friendships
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id1 = auth.uid());

CREATE POLICY "Users can update friendships they're part of"
  ON friendships
  FOR UPDATE
  TO authenticated
  USING (
    user_id1 = auth.uid() OR
    user_id2 = auth.uid()
  );

CREATE POLICY "Users can read team ups they're part of"
  ON team_ups
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create team ups"
  ON team_ups
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can manage their rewards"
  ON rewards
  FOR ALL
  TO authenticated
  USING (user_id = auth.uid());

-- Insert default categories
INSERT INTO categories (name, icon) VALUES
  ('Travel', '✈️'),
  ('Adventure', '🏃'),
  ('Personal Growth', '🌱'),
  ('Career', '💼'),
  ('Education', '📚'),
  ('Health', '💪'),
  ('Relationships', '❤️'),
  ('Creative', '🎨'),
  ('Financial', '💰'),
  ('Lifestyle', '🌟');