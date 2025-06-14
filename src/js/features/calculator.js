export function calculator(expression) {
    try {
      const cleanExpression = expression.replace(/\s+/g, '')

       if (!/^[0-9+\-*/().%]+$/.test(cleanExpression)) {
           throw new Error('Invalid characters.')
        }

        const result = new Function('return '+cleanExpression)()
        if (result === undefined || isNaN(result)) {
            throw new Error('Syntax error')
        }
        if (!isFinite(result)) {
            throw new Error('Math error')
        }
        writeToConsole(`= ${result}`)
    } catch (error) {
        writeToConsole('Statement error')
    }
} 
//calc menu
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
|=========================================================|
+---------------------------------------------------------+
`