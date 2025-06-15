import { supabase } from './supabaseCalcDB.js'

export const calcUI = `
╔═══════════════════════════════════════════╗
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
| [calc hist *   : Show all history]                      |
| [calc hist OP  : Show specific OP history]              |
| [calc hist del OP : Delete specific OP from history]    |
|=========================================================|
+---------------------------------------------------------+`

export async function calculator(expression) {
  try {
    const cleanExpression = expression.trim().toLowerCase()
    if (cleanExpression.toLowerCase().startsWith('calc hist')){
      const args = cleanExpression.split(' ')
      const subCommand = args[2]?.toLowerCase() || args[1]?.toLowerCase()
      if (subCommand === '*') {
        const { data, error } = await supabase
          .from('calc_history')
          .select('*')
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
        const op = args.slice(3).join(' ')
        const { error } = await supabase
          .from('calc_history')
          .delete()
          .eq('expression', op)
        if (error) throw error
        window.writeToConsole(`Deleted "${op}" from history.`)
        return
      } else {
        const op = args.slice(2).join(' ') || args.slice(1).join(' ')
        const { data, error } = await supabase
          .from('calc_history')
          .select('*')
          .eq('expression', op)
        if (error) throw error

        if (data.length === 0) {
          window.writeToConsole(`No history for "${op}".`)
        } else {
          data.forEach(record => {
            window.writeToConsole(`${record.expression} = ${record.result}`)
          })
        }
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
