-- Create recommendations table
CREATE TABLE IF NOT EXISTS recommendations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category TEXT NOT NULL CHECK (category IN ('read', 'watch', 'listen', 'follow')),
  recommended_by TEXT NOT NULL,
  title TEXT NOT NULL,
  link TEXT,
  notes TEXT,
  follow_regularly BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create index for faster category filtering
CREATE INDEX IF NOT EXISTS idx_recommendations_category ON recommendations(category);

-- Enable Row Level Security
ALTER TABLE recommendations ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (since we're using Basic Auth at app level)
CREATE POLICY "Allow all operations" ON recommendations
  FOR ALL
  USING (true)
  WITH CHECK (true);
