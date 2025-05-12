export function measurementConverter(input) {
   const trimmedInput = input.trim().toLowerCase()

    if (trimmedInput.startsWith('convt ')) {
        try {
            const parts = trimmedInput.split(' ')
            if (parts.length !== 5 || parts[3] !== 'to') {
                return 'Invalid format. Use: convt {value} {fromValMeas} 2 {toValMeas}'
            }
            const [, valueStr, from, , to] = parts
            const num = parseFloat(valueStr)
            if (isNaN(num)) return 'Invalid number.'
            //cm conversion logic
            if (from === 'cm' && to === 'ft') return `${num} cm = ${num * 0.032808} ft`;
            if (from === 'cm' && to === 'm') return `${num} cm = ${num / 100} m`;
            if (from === 'cm' && to === 'in') return `${num} cm = ${num * 0.39370} in`;
            if (from === 'cm' && to === 'yd') return `${num} cm = ${num * 0.010936} yd`;
            if (from === 'cm' && to === 'km') return `${num} cm = ${num / 100000} km`;
            if (from === 'cm' && to === 'mi') return `${num} cm = ${num * 0.0000062137} mi`;
            //ft conversion logic
            if (from === 'ft' && to === 'm') return `${num} ft = ${num / 3.2808} m`;
            if (from === 'ft' && to === 'in') return `${num} ft = ${num * 12} in`;
            if (from === 'ft' && to === 'cm') return `${num} ft = ${num / 0.032808} cm`;
            if (from === 'ft' && to === 'yd') return `${num} ft = ${num * 0.33333} yd`;
            if (from === 'ft' && to === 'km') return `${num} ft = ${num / 3280.8} km`;
            if (from === 'ft' && to === 'mi') return `${num} ft = ${num * 0.00018939} mi`;
            //in conversion logic
            if (from === 'in' && to === 'ft') return `${num} in = ${num * 0.083333} ft`;
            if (from === 'in' && to === 'm') return `${num} in = ${num / 39.370} m`;
            if (from === 'in' && to === 'cm') return `${num} in = ${num / 0.39370} cm`;
            if (from === 'in' && to === 'yd') return `${num} in = ${num * 0.027778} yd`;
            if (from === 'in' && to === 'km') return `${num} in = ${num / 39370} km`;
            if (from === 'in' && to === 'mi') return `${num} in = ${num * 0.000015783} mi`;
            //km conversion logic
            if (from === 'km' && to === 'ft') return `${num} km = ${num * 3280.8} ft`;
            if (from === 'km' && to === 'm') return `${num} km = ${num * 1000} m`;
            if (from === 'km' && to === 'in') return `${num} km = ${num * 39370} in`;
            if (from === 'km' && to === 'cm') return `${num} km = ${num * 100000} cm`;
            if (from === 'km' && to === 'yd') return `${num} km = ${num * 1093.6} yd`;
            if (from === 'km' && to === 'mi') return `${num} km = ${num * 0.62137} mi`;
            //m conversion logic
            if (from === 'm' && to === 'ft') return `${num} m = ${num * 3.2808} ft`;
            if (from === 'm' && to === 'in') return `${num} m = ${num * 39.370} in`;
            if (from === 'm' && to === 'cm') return `${num} m = ${num / 0.01} cm`;
            if (from === 'm' && to === 'yd') return `${num} m = ${num * 1.0936} yd`;
            if (from === 'm' && to === 'km') return `${num} m = ${num / 1000} km`;
            if (from === 'm' && to === 'mi') return `${num} m = ${num * 0.00062137} mi`;
            //mi conversion logic
            if (from === 'mi' && to === 'ft') return `${num} mi = ${num * 5280} ft`;
            if (from === 'mi' && to === 'm') return `${num} mi = ${num / 0.00062137} m`;
            if (from === 'mi' && to === 'in') return `${num} mi = ${num * 63360} in`;
            if (from === 'mi' && to === 'cm') return `${num} mi = ${num / 0.0000062137} cm`;
            if (from === 'mi' && to === 'yd') return `${num} mi = ${num * 1760} yd`;
            if (from === 'mi' && to === 'km') return `${num} mi = ${num / 0.62137} km`;
            //yd conversion logic
            if (from === 'yd' && to === 'ft') return `${num} yd = ${num * 3} ft`;
            if (from === 'yd' && to === 'm') return `${num} yd = ${num / 1.0936} m`;
            if (from === 'yd' && to === 'in') return `${num} yd = ${num * 36} in`;
            if (from === 'yd' && to === 'cm') return `${num} yd = ${num / 0.010936} cm`;
            if (from === 'yd' && to === 'km') return `${num} yd = ${num / 1093.6} km`;
            if (from === 'yd' && to === 'mi') return `${num} yd = ${num * 0.00056818} mi`;

            return 'Supported units: cm, ft, in, km, m, mi, yd'
        } catch {
            return 'Invalid input. Format: convt {value} {from} 2 {to}'
        }
    }

    return 'Please start your command with "convt"'
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
