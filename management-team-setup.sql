-- Management Team Setup SQL
-- Run this in your Supabase SQL Editor

-- Create management_team table for managing team members
CREATE TABLE IF NOT EXISTS management_team (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  experience TEXT,
  image_url TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on management_team table
ALTER TABLE management_team ENABLE ROW LEVEL SECURITY;

-- Drop existing management team policies if they exist and recreate them
DROP POLICY IF EXISTS "Allow anyone to read management team" ON management_team;
DROP POLICY IF EXISTS "Allow anyone to insert management team" ON management_team;
DROP POLICY IF EXISTS "Allow anyone to update management team" ON management_team;
DROP POLICY IF EXISTS "Allow anyone to delete management team" ON management_team;

-- Create policies for management_team
CREATE POLICY "Allow anyone to read management team" ON management_team
  FOR SELECT USING (true);

CREATE POLICY "Allow anyone to insert management team" ON management_team
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anyone to update management team" ON management_team
  FOR UPDATE USING (true);

CREATE POLICY "Allow anyone to delete management team" ON management_team
  FOR DELETE USING (true);

-- Insert initial management team data
INSERT INTO management_team (name, role, experience, image_url, order_index) VALUES 
('Nikolay Seleznev', 'Co-founder and Chief Strategy and Business Development Officer', '(ex. JP Morgan, Arthur D. Little, Eurasian Resources Group)', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face', 1),
('Roman Lavrentyev', 'Co-founder and COO', '(ex. Sifox, PimPay, Arenza, Logarifma)', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&crop=face', 2),
('Nikita Gulyaev', 'CFO', '(ex. EY, PwC, AlfaBank Belarus, BCS Group)', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop&crop=face', 3),
('Sergey Salikov', 'General Counsel', '(ex. Russian Direct Investment Fund, Gazprombank)', 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&h=500&fit=crop&crop=face', 4),
('Anna Melnova', 'Chief Marketing Officer', '(ex. AliExpress, VK, Avito, Yandex)', 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=500&fit=crop&crop=face', 5)
ON CONFLICT DO NOTHING;
