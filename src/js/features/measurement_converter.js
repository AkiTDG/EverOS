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
            // Clean up input: remove all non-numeric characters, except spaces
            const cleanedInput = trimmedInput.replace(/([a-zA-Z])(\d+)/g, '$1 $2').replace(/\s+/g, ' ').trim();
            console.log('Cleaned input:', cleanedInput);  // Debugging output

            // Split input and ensure it's in the correct format
            const parts = cleanedInput.split(' ').filter(part => part !== '');
            console.log('Parts:', parts);  // Debugging output

            // Ensure the correct format: convt {value} {from} to {to}
            if (parts.length !== 5 || parts[3] !== 'to') {
                return 'Invalid format. Use: convt {value} {from} to {to}';
            }

            // Extract the parts
            const [, valueStr, from, , to] = parts;
            const num = parseFloat(valueStr);

            // Validate the number
            if (isNaN(num)) return 'Invalid number.';

            // Validate the units
            if (!(from in conversionFactorsToMeter) || !(to in conversionFactorsToMeter)) {
                return 'Supported units: cm, ft, in, km, m, mi, yd';
            }

            // Convert the value
            const valueInMeters = num * conversionFactorsToMeter[from];
            const convertedValue = valueInMeters / conversionFactorsToMeter[to];
            const rounded = parseFloat(convertedValue.toFixed(2));

            // Return the result
            return `${num} ${from} = ${rounded} ${to}`;
        } catch (error) {
            console.error(error);  // Log any errors to the console
            return 'Invalid input. Format: convt {value} {from} to {to}';
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
`;
