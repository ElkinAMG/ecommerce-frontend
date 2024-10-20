import { createClient } from '@supabase/supabase-js'

export const supabase = createClient('https://fkpffyvxexglgzhvmlvz.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZrcGZmeXZ4ZXhnbGd6aHZtbHZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkxNjU3MzgsImV4cCI6MjA0NDc0MTczOH0.TTVG6bWuIPqtPALu-ZnUGKjWwzx4FvuvfcVC-z0WFx0')