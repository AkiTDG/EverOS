export function calculator(expression) {
    try {
      const cleanExpression = expression.replace(/\s+/g, '');

       if (!/^[0-9+\-*/().%]+$/.test(cleanExpression)) {
           throw new Error('Invalid characters.');
        }

        const result = new Function('return '+cleanExpression)();
        if (result === undefined || isNaN(result)) {
            throw new Error('Syntax error');
        }
        if (!isFinite(result)) {
            throw new Error('Math error');
        }
        writeToConsole(`= ${result}`);
    } catch (error) {
        writeToConsole('Statement error');
    }
} 

//calc menu
export const calcUi = `
+------------------------------------------------------------------------+
|========================================================================|
| Entered Calculator mode. Type "exit" to leave.                         |
| Type "exit" to leave.                                                  |
| <==Operations==>                                                       |
| [+: Addition                                                         ] |
| [-: Subtraction. Can also use to indicate a negative numerical value.] |
| [*: Multiplication                                                   ] |
| [/: Division                                                         ] |
| [%: Modulus. Takes division remainder as result.                     ] |
|========================================================================|
+------------------------------------------------------------------------+
`;
