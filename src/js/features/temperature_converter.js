
let conversionMode = null;

export function resetTempMode() {
    conversionMode = null;
}
export function temperatureConverter(input) {
    if (conversionMode === null) {
        if (input === '1') {
            conversionMode = 'CtoF';
            return 'Enter value in °C:';
        } else if (input === '2') {
            conversionMode = 'FtoC';
            return 'Enter value in °F:';
        } else {
            return 'Invalid option. Type 1 or 2.';
        }
    }

    const temp = parseFloat(input);
    if (isNaN(temp)) return 'Invalid value. Try again.';

    let result;
    if (conversionMode === 'CtoF') {
        result = `${temp}°C is ${(temp * 9 / 5 + 32).toFixed(2)}°F in degree Fahrenheit.`;
    } else if (conversionMode === 'FtoC') {
        result = `${temp}°F is ${((temp - 32) * 5 / 9).toFixed(2)}°C in degree Celsius.`;
    }

    conversionMode = null;
    return result;
}

export const tcUi = `
+------------------------------------------------------------------+
|==================================================================|
| Temperature Converter                                            |
|                                                                  |
| <==Operations==>                                                 |
| [Press 1 to convert Degree Celsius(°C) to Degree Fahrenheit(°F)] |
| [Press 2 to convert Degree Fahrenheit(°F) to Degree Celsius(°C)] |
|==================================================================|
+------------------------------------------------------------------+`;
