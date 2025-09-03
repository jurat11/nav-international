-- Create blogs table
CREATE TABLE IF NOT EXISTS blogs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  image_url TEXT NOT NULL,
  date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on created_at for better performance
CREATE INDEX IF NOT EXISTS idx_blogs_created_at ON blogs(created_at DESC);

-- Create an index on date for better performance
CREATE INDEX IF NOT EXISTS idx_blogs_date ON blogs(date DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist and recreate them
DROP POLICY IF EXISTS "Anyone can read blogs" ON blogs;
DROP POLICY IF EXISTS "Anyone can insert blogs" ON blogs;
DROP POLICY IF EXISTS "Anyone can update blogs" ON blogs;
DROP POLICY IF EXISTS "Anyone can delete blogs" ON blogs;

-- Create a policy that allows anyone to read blogs
CREATE POLICY "Anyone can read blogs" ON blogs
  FOR SELECT USING (true);

-- Create a policy that allows anyone to insert blogs (for admin use)
CREATE POLICY "Anyone can insert blogs" ON blogs
  FOR INSERT WITH CHECK (true);

-- Create a policy that allows anyone to update blogs (for admin use)
CREATE POLICY "Anyone can update blogs" ON blogs
  FOR UPDATE USING (true);

-- Create a policy that allows anyone to delete blogs (for admin use)
CREATE POLICY "Anyone can delete blogs" ON blogs
  FOR DELETE USING (true);

-- Create storage bucket for blog images (ignore if exists)
INSERT INTO storage.buckets (id, name, public) VALUES ('blog-images', 'blog-images', true)
ON CONFLICT (id) DO NOTHING;

-- Drop existing storage policies if they exist and recreate them
DROP POLICY IF EXISTS "Anyone can view blog images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can upload blog images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can update blog images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can delete blog images" ON storage.objects;

-- Create storage policies for blog images
CREATE POLICY "Anyone can view blog images" ON storage.objects
  FOR SELECT USING (bucket_id = 'blog-images');

CREATE POLICY "Anyone can upload blog images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'blog-images');

CREATE POLICY "Anyone can update blog images" ON storage.objects
  FOR UPDATE USING (bucket_id = 'blog-images');

CREATE POLICY "Anyone can delete blog images" ON storage.objects
  FOR DELETE USING (bucket_id = 'blog-images');

-- Insert some sample data
INSERT INTO blogs (title, content, excerpt, image_url, date) VALUES
(
  'Uzum Secures $70M Equity Financing Led by Tencent and VR Capital, Reaches $1.5B Valuation',
  '<h2>Major Funding Milestone</h2><p>Uzum has successfully raised <strong>$70 million</strong> in equity financing, led by <em>Tencent and VR Capital</em>, reaching a valuation of <strong>$1.5 billion</strong>. This funding will accelerate the company''s expansion across Central Asia and enhance its fintech and e-commerce capabilities.</p><h3>Strategic Impact</h3><p>This development represents a significant milestone in Uzum''s growth trajectory, demonstrating the company''s commitment to innovation and excellence in the Central Asian market. The expansion reflects the growing demand for digital services across the region and Uzum''s strategic positioning to meet these evolving needs.</p><blockquote><p>The company continues to expand its ecosystem of services, providing comprehensive solutions for businesses and consumers across the region.</p></blockquote><p>This latest achievement underscores Uzum''s position as a leading technology company in Uzbekistan and its vision to transform the digital landscape of Central Asia.</p>',
  'Uzum has successfully raised $70 million in equity financing, led by Tencent and VR Capital, reaching a valuation of $1.5 billion.',
  'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&h=400&fit=crop&crop=center',
  '2025-08-05'
),
(
  'Uzum Bank Named Uzbekistan''s Best Digital Bank by Euromoney',
  '<h2>Prestigious Recognition</h2><p>Uzum Bank has been recognized as <strong>Uzbekistan''s Best Digital Bank</strong> by <em>Euromoney</em>, highlighting the bank''s innovative digital services and customer-centric approach to financial technology.</p><h3>Excellence in Digital Innovation</h3><p>This prestigious award recognizes Uzum Bank''s commitment to providing cutting-edge digital banking solutions that meet the evolving needs of customers across Uzbekistan. The bank has consistently demonstrated excellence in:</p><ul><li>Digital innovation</li><li>User experience design</li><li>Financial technology implementation</li></ul><p>The recognition from Euromoney, a leading global financial publication, further solidifies Uzum Bank''s position as a pioneer in digital banking within the Central Asian region.</p>',
  'Uzum Bank has been recognized as Uzbekistan''s Best Digital Bank by Euromoney, highlighting the bank''s innovative digital services.',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&crop=center',
  '2025-07-18'
),
(
  'Uzum Assigned ''B'' Rating with Positive Outlook by Fitch',
  '<h2>Credit Rating Upgrade</h2><p>Fitch Ratings has assigned Uzum a <strong>''B'' rating with a positive outlook</strong>, reflecting the company''s strong market position and growth potential in the Central Asian fintech sector.</p><h3>Financial Performance Recognition</h3><p>This rating upgrade reflects Uzum''s:</p><ul><li>Robust financial performance</li><li>Strong market position</li><li>Continued growth trajectory</li></ul><p>The positive outlook indicates Fitch''s confidence in the company''s ability to maintain and improve its financial standing in the coming years.</p><blockquote><p>The rating recognizes Uzum''s diversified business model, strong management team, and strategic positioning in the rapidly growing Central Asian digital economy.</p></blockquote>',
  'Fitch Ratings has assigned Uzum a ''B'' rating with a positive outlook, reflecting the company''s strong market position.',
  'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop&crop=center',
  '2025-07-14'
);

-- Create history_years table for managing history years
CREATE TABLE IF NOT EXISTS history_years (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  year INTEGER UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create history_events table for managing events within each year
CREATE TABLE IF NOT EXISTS history_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  year_id UUID REFERENCES history_years(id) ON DELETE CASCADE,
  month TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on history tables
ALTER TABLE history_years ENABLE ROW LEVEL SECURITY;
ALTER TABLE history_events ENABLE ROW LEVEL SECURITY;

-- Drop existing history policies if they exist and recreate them
DROP POLICY IF EXISTS "Allow anyone to read history years" ON history_years;
DROP POLICY IF EXISTS "Allow anyone to insert history years" ON history_years;
DROP POLICY IF EXISTS "Allow anyone to update history years" ON history_years;
DROP POLICY IF EXISTS "Allow anyone to delete history years" ON history_years;

DROP POLICY IF EXISTS "Allow anyone to read history events" ON history_events;
DROP POLICY IF EXISTS "Allow anyone to insert history events" ON history_events;
DROP POLICY IF EXISTS "Allow anyone to update history events" ON history_events;
DROP POLICY IF EXISTS "Allow anyone to delete history events" ON history_events;

-- Create policies for history_years
CREATE POLICY "Allow anyone to read history years" ON history_years
  FOR SELECT USING (true);

CREATE POLICY "Allow anyone to insert history years" ON history_years
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anyone to update history years" ON history_years
  FOR UPDATE USING (true);

CREATE POLICY "Allow anyone to delete history years" ON history_years
  FOR DELETE USING (true);

-- Create policies for history_events
CREATE POLICY "Allow anyone to read history events" ON history_events
  FOR SELECT USING (true);

CREATE POLICY "Allow anyone to insert history events" ON history_events
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anyone to update history events" ON history_events
  FOR UPDATE USING (true);

CREATE POLICY "Allow anyone to delete history events" ON history_events
  FOR DELETE USING (true);

-- Insert initial 2025 data
INSERT INTO history_years (year, title, description, image_url) VALUES 
(2025, '2025 Milestone', 'Our journey of innovation and growth continues', 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&h=1000&fit=crop&crop=center')
ON CONFLICT (year) DO NOTHING;

-- Get the year_id for 2025 and insert events
DO $$
DECLARE
    year_2025_id UUID;
BEGIN
    SELECT id INTO year_2025_id FROM history_years WHERE year = 2025;
    
    -- Insert events for 2025
    INSERT INTO history_events (year_id, month, title, description, order_index) VALUES 
    (year_2025_id, 'January', 'Global Expansion Initiative', 'Launched operations in 5 new countries across Southeast Asia and Eastern Europe', 1),
    (year_2025_id, 'March', 'AI Innovation Lab', 'Opened our first AI research facility in Tashkent, focusing on fintech solutions', 2)
    ON CONFLICT DO NOTHING;
END $$;

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
('Anna Melnova', 'Chief Marketing Officer', '(ex. AliExpress, VK, Avito, Yandex)', 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=500&fit=crop&crop=face', 5)
ON CONFLICT DO NOTHING;
