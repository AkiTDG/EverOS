//initial mode
let conversionMode = null
//reset conversion mode
export function resetTempMode() {conversionMode = null}
//program logic
export function temperatureConverter(input) {
    const trimmedInput = input.trim().toLowerCase()

    if (trimmedInput === 'celsf') {
        conversionMode = 'CtoF'
        return '[Mode set to °C ➝ °F.Enter value in degree Celsius(°C):]'
    } else if (trimmedInput === 'fahrc') {
        conversionMode = 'FtoC'
        return '[Mode set to °F ➝ °C.Enter value in degree Fahrenheit(°F):]'
    }
    if (conversionMode === null) {
        return '[ValueError:Please type "celsf" or "fahrc" to start conversion mode.]'
    }

    const temp = parseFloat(trimmedInput)
    if (isNaN(temp)) {
        return '[ValueError:Enter a numeric temperature.]'
    }
    if (conversionMode === 'CtoF') {
        const result = (temp * 9 / 5 + 32).toFixed(2)
        return `[${temp}°C (degree Celsius) = ${result}°F in degree Fahrenheit.]`
    }
    if (conversionMode === 'FtoC') {
        const result = ((temp - 32) * 5 / 9).toFixed(2)
        return `[${temp}°F (degree Fahrenheit) = ${result}°C in degree Celsius.]`
    }
}
//feature ui
export const tcUI = `
.---------------------------------------------------------------.
|  ______                                     __                |
| /_  __/__  ____ ___  ____  ___  _________ _/ /___  __________ |
|  / / / _ \\/ __ \`__ \\/ __ \\/ _ \\/ ___/ __ \`/ __/ / / / ___/ _ \\|
| / / /  __/ / / / / / /_/ /  __/ /  / /_/ / /_/ /_/ / /  /  __/|
|/_/__\\___/_/ /_/ /_/ .___/\\___/_/   \\__,_/\\__/\\__,_/_/   \\___/ |
|  / ____/___  ____/_/  _____  _____/ /____  _____              |
| / /   / __ \\/ __ \\ | / / _ \\/ ___/ __/ _ \\/ ___/              |
|/ /___/ /_/ / / / / |/ /  __/ /  / /_/  __/ /                  |
|\\____/\\____/_/ /_/|___/\\___/_/   \\__/\\___/_/                   |
'---------------------------------------------------------------'      

+----------------------------------------------------------------------+
|======================================================================|
| Temperature Converter                                                |
|                                                                      |
| <==Operations==>                                                     |
| [Type 'celsf' to convert Degree Celsius(°C) to Degree Fahrenheit(°F)]|
| [Type 'fahrc' to convert Degree Fahrenheit(°F) to Degree Celsius(°C)]|
|======================================================================|
+----------------------------------------------------------------------+`
