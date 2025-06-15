import { createClient } from 'https://esm.sh/@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
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
    body: JSON.stringify(body),
  }
}
