const API_ENDPOINT = '/.netlify/functions/calc-api'

export async function logCalculation(expression, result) {
  const res = await fetch(API_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type: 'upsert',
      expression,
      result
    })
  })

  if (!res.ok) throw new Error('Failed to log calculation.')
}

export async function getAllHistory() {
  const res = await fetch(API_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type: 'getAll' })
  })

  if (!res.ok) throw new Error('Failed to fetch history.')
  return await res.json()
}

export async function getOneHistory(expression) {
  const res = await fetch(API_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type: 'getOne', expression })
  })

  if (!res.ok) throw new Error('Failed to fetch expression.')
  return await res.json()
}

export async function deleteHistory(expression) {
  const res = await fetch(API_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type: 'delete', expression })
  })

  if (!res.ok) throw new Error('Failed to delete expression.')
}
