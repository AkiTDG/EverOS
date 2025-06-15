import { createClient } from 'https://esm.sh/@supabase/supabase-js'

const supabase = createClient(
 'https://zmnlctsroufobhdyntsw.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InptbmxjdHNyb3Vmb2JoZHludHN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5MDEwOTIsImV4cCI6MjA2NTQ3NzA5Mn0.rG71SRERVjnIrQDcQbqGKwiFUsO3mhQ37bPXnFrenjM'
)

export async function handler(event) {
  const { type, expression, result } = JSON.parse(event.body || '{}')

  try {
    if (type === 'getAll') {
      const { data, error } = await supabase.from('calc_history').select('*')
      if (error) throw error
      return respond(200, data)
    }

    if (type === 'getOne') {
      const { data, error } = await supabase.from('calc_history').select('*').eq('expression', expression)
      if (error) throw error
      return respond(200, data)
    }

    if (type === 'delete') {
      const { error } = await supabase.from('calc_history').delete().eq('expression', expression)
      if (error) throw error
      return respond(200, { success: true })
    }

    if (type === 'upsert') {
      const { error } = await supabase.from('calc_history').upsert({
        expression,
        result,
        created_at: new Date().toISOString(),
      }, { onConflict: 'expression' })
      if (error) throw error
      return respond(200, { success: true })
    }

    return respond(400, { error: 'Unknown operation type.' })
  } catch (e) {
    return respond(500, { error: e.message })
  }
}

function respond(statusCode, body) {
  return {
    statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body),
  }
}

