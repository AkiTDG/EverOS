

import { createClient } from 'https://esm.sh/@supabase/supabase-js'
const SUPABASE_URL = 'https://zmnlctsroufobhdyntsw.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InptbmxjdHNyb3Vmb2JoZHludHN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5MDEwOTIsImV4cCI6MjA2NTQ3NzA5Mn0.rG71SRERVjnIrQDcQbqGKwiFUsO3mhQ37bPXnFrenjM'

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

export async function logCalculation(expression, result) {
  const { data, error } = await supabase
    .from('calculator_history')
    .insert([{ expression, result }])

  if (error) {
    console.error('Logging failed:', error.message)
  } else {
    console.log('Logged calculation:', data)
  }
}

export async function fetchCalculationHistory(limit = 10) {
  const { data, error } = await supabase
    .from('calculator_history')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Fetching history failed:', error.message)
    return []
  }

  return data
}
