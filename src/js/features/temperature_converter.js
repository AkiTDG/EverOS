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
 _____                             _                 
|_   _|__ _ __  _ __  ___ _ _ __ _| |_ _  _ _ _ ___  
  | |/ -_) '  \\| '_ \\/ -_) '_/ _\` |  _| || | '_/ -_) 
  |_|\\___|_|_|_| .__/\\___|_| \\__,_|\\__|\\_,_|_| \\___| 
 / __|___ _ ___|_|___ _ _| |_ ___ _ _                
| (__/ _ \\ ' \\ V / -_) '_|  _/ -_) '_|               
 \\___\\___/_||_\\_/\\___|_|  \\__\\___|_|    

+-------------------------------------------+
|===========================================|
| Temperature Converter                     |
|                                           |
| <==Operations==>                          |
| [celsf - Celsius to Fahrenheit]           |
| [fahrc - Fahrenheit to Celsius]           |
|===========================================|
+-------------------------------------------+`
