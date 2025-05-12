export function measurementConverter(input) {
    const trimmedInput = input.trim().toLowerCase();

    const conversionFactorsToMeter = {
        cm: 0.01,
        m: 1,
        km: 1000,
        ft: 0.3048,
        in: 0.0254,
        mi: 1609.34,
        yd: 0.9144
    };

    if (trimmedInput.startsWith('convt ')) {
        try {
            const parts = trimmedInput.split(' ');
            if (parts.length !== 5 || parts[3] !== '2') {
                return 'Invalid format. Use: convt {value} {from} 2 {to}';
            }

            const [, valueStr, from, , to] = parts;
            const num = parseFloat(valueStr);
            if (isNaN(num)) return 'Invalid number.';

            if (!(from in conversionFactorsToMeter) || !(to in conversionFactorsToMeter)) {
                return 'Supported units: cm, ft, in, km, m, mi, yd';
            }

            const valueInMeters = num * conversionFactorsToMeter[from];
            const convertedValue = valueInMeters / conversionFactorsToMeter[to];
            const rounded = parseFloat(convertedValue.toFixed(2));

            return `${num} ${from} = ${rounded} ${to}`;
        } catch {
            return 'Invalid input. Format: convt {value} {from} 2 {to}';
        }
    }

    return 'Please start your command with "convt"';
}

export const mscUI = `
+---------------------------+
|===========================|
|                           |
|[Your text goes here]      |
|                           | 
|===========================|
+---------------------------+               
`