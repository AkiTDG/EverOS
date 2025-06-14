import { supabase } from './supabaseCalc.js'

// ✅ Keeps your ASCII UI
export const calcUI = `╔═══════════════════════════════════════════╗
║ ░█▀▀░█▀█░█░░░█▀▀░█░█░█░░░█▀█░▀█▀░█▀█░█▀▄  ║
║ ░█░░░█▀█░█░░░█░░░█░█░█░░░█▀█░░█░░█░█░█▀▄  ║
║ ░▀▀▀░▀░▀░▀▀▀░▀▀▀░▀▀▀░▀▀▀░▀░▀░░▀░░▀▀▀░▀░▀  ║
╚═══════════════════════════════════════════╝
+---------------------------------------------------------+
|=========================================================|
| Mathematical Calculator                                 |
|                                                         |
| <==Operations==>                                        |
| [+: Addition                                          ] |
| [-: Subtraction; Indicates a negative numerical value.] |
| [*: Multiplication                                    ] |
| [/: Division                                          ] |
| [%: Modulus. Takes division remainder as result.      ] |
|                                                         |
| <==History Commands==>                                  |
| [calc hist *     : Show all calculation history.      ] |
| [calc hist X     : Show a specific operation X.       ] |
| [calc hist del X : Delete operation X from history.   ] |
|=========================================================|
+---------------------------------------------------------+

`

export async function calculator(expression) {
  try {
    const cleanExpression = expression.trim()

    // ✅ FIXED: Correct history command parsing
    if (cleanExpression.startsWith('calc hist')) {
      const args = cleanExpression.split(' ')
      const subCommand = args[2] // ✅ CORRECTED

      if (subCommand === '*') {
        // Show all history
        const { data, error } = await supabase.from('calc_history').select('*')
        if (error) throw error

        if (data.length === 0) {
          window.writeToConsole('No history found.')
        } else {
          data.forEach(record => {
            window.writeToConsole(`${record.expression} = ${record.result}`)
          })
        }
        return
      } else if (subCommand === 'del' && args[3]) {
        // Delete specific operation
        const op = args.slice(3).join(' ')
        const { error } = await supabase.from('calc_history').delete().eq('expression', op)
        if (error) throw error
        window.writeToConsole(`Deleted "${op}" from history.`)
        return
      } else if (subCommand) {
        const op = args.slice(2).join(' ')
        const { data, error } = await supabase.from('calc_history').select('*').eq('expression', op)
        if (error) throw error

        if (data.length === 0) {
          window.writeToConsole(`No history for "${op}".`)
        } else {
          data.forEach(record => {
            window.writeToConsole(`${record.expression} = ${record.result}`)
          })
        }
        return
      } else {
        window.writeToConsole('Invalid history command.')
        return
      }
    }
    const mathExpression = cleanExpression.replace(/\s+/g, '')
    if (!/^[0-9+\-*/().%]+$/.test(mathExpression)) {
      throw new Error('Invalid characters.')
    }

    const result = new Function('return ' + mathExpression)()
    if (result === undefined || isNaN(result)) throw new Error('Syntax error')
    if (!isFinite(result)) throw new Error('Math error')

    window.writeToConsole(`= ${result}`)

    const { error } = await supabase
      .from('calc_history')
      .upsert(
        {
          expression: mathExpression,
          result: result.toString(),
          created_at: new Date().toISOString()
        },
        { onConflict: 'expression' }
      )

    if (error) throw error
  } catch (error) {
    console.error(error)
    window.writeToConsole('Statement error')
  }
}
