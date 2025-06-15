import { createClient } from 'https://esm.sh/@supabase/supabase-js'

const supabaseUrl = 'https://zmnlctsroufobhdyntsw.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InptbmxjdHNyb3Vmb2JoZHludHN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5MDEwOTIsImV4cCI6MjA2NTQ3NzA5Mn0.rG71SRERVjnIrQDcQbqGKwiFUsO3mhQ37bPXnFrenjM'

export const supabase = createClient(supabaseUrl, supabaseKey)