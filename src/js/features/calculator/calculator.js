import {
  logCalculation,
  getAllHistory,
  getOneHistory,
  deleteHistory
} from './supabaseCalcDB.js'

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

    if (cleanExpression.startsWith('calc hist')) {
      const args = cleanExpression.split(' ')
      const subCommand = args[2]

      if (subCommand === '*') {
        const data = await getAllHistory()
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
        await deleteHistory(op)
        window.writeToConsole(`Deleted "${op}" from history.`)
        return
      } else if (subCommand) {
        const op = args.slice(2).join(' ')
        const data = await getOneHistory(op)
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

    // Save to history using Netlify backend
    await logCalculation(mathExpression, result.toString())

  } catch (error) {
    console.error(error)
    window.writeToConsole('Statement error')
  }
}
