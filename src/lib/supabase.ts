import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ttxvblczjsnrmebofays.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0eHZibGN6anNucm1lYm9mYXlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY4MTczMDcsImV4cCI6MjA3MjM5MzMwN30.-ysUwd1YtVjtTIscX-DVk10r87hSi_zzlFMTzJy0o3U'

export const supabase = createClient(supabaseUrl, supabaseKey)

export interface Blog {
  id: string
  title: string
  content: string
  excerpt: string
  image_url: string
  date: string
  created_at: string
  updated_at: string
}

export interface HistoryYear {
  id: string
  year: number
  title: string
  description?: string
  image_url?: string
  created_at: string
  updated_at: string
}

export interface HistoryEvent {
  id: string
  year_id: string
  month: string
  title: string
  description: string
  order_index: number
  created_at: string
  updated_at: string
}

export interface HistoryYearWithEvents extends HistoryYear {
  events: HistoryEvent[]
}

export interface ManagementTeamMember {
  id: string
  name: string
  role: string
  experience?: string
  image_url?: string
  order_index: number
  created_at: string
  updated_at: string
}