import { createClient } from 'https://esm.sh/@supabase/supabase-js'

const SUPABASE_URL = 'https://zmnlctsroufobhdyntsw.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InptbmxjdHNyb3Vmb2JoZHludHN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5MDEwOTIsImV4cCI6MjA2NTQ3NzA5Mn0.rG71SRERVjnIrQDcQbqGKwiFUsO3mhQ37bPXnFrenjM'

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

// ✅ Log a new calculation
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

// ✅ Fetch all history
export async function getAllHistory() {
  const { data, error } = await supabase
    .from('calculator_history')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Fetching history failed:', error.message)
    return []
  }

  return data
}

// ✅ Fetch specific operation by expression
export async function getOneHistory(expression) {
  const { data, error } = await supabase
    .from('calculator_history')
    .select('*')
    .ilike('expression', `%${expression}%`)

  if (error) {
    console.error('Fetching specific history failed:', error.message)
    return []
  }

  return data
}

// ✅ Delete specific operation by expression
export async function deleteHistory(expression) {
  const { data, error } = await supabase
    .from('calculator_history')
    .delete()
    .ilike('expression', `%${expression}%`)

  if (error) {
    console.error('Deleting history failed:', error.message)
  } else {
    console.log(`Deleted history for: ${expression}`)
  }
}
