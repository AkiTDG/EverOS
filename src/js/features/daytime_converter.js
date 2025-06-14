//initial cnversion mode
let conversionMode = null
//resets conversion mode
export function resetConvMode() {conversionMode = null}
//day conversion formula
function daysconverter(day){
const hour=day*24
const minute=hour*60
const second=minute*60
return {hour,minute,second}
}
//hour conversion formula
function hoursconverter(hour){
const day=hour/24
const minute=hour*60
const second=minute*60
return {day,minute,second}
}
//minute conversion formula
function minutesconverter(minute){
const day=minute/1440
const hour=minute/60
const second=minute*60
return {day,hour,second}
}
//seconds conversion formula
function secondsconverter(second){
const day=second/86400 
const hour=second/3600
const minute=second/60
return {day,hour,minute}
}
//converter logic
export function converterLogic(input, writeToConsole) {
 const trimmedInput = input.trim().toLowerCase()

  if (trimmedInput.startsWith("convm ")) {
    const mode = trimmedInput.substring(6)
    switch (mode) {
      case "day":
        conversionMode = "day"
        writeToConsole("Conversion mode set to DAYS.Enter number of days:")
        break
      case "hr":
        conversionMode = "hour"
        writeToConsole("Conversion mode set to HOURS.Enter number of hours:")
        break
      case "min":
        conversionMode = "minute"
        writeToConsole("Conversion mode set to MINUTES.Enter number of minutes:")
        break
      case "sec":
        conversionMode = "second"
        writeToConsole("Conversion mode set to SECONDS.Enter number of seconds:")
        break
      default:
        writeToConsole("[Convm Error: Unknown conversion mode.]")
        break
    }
    return
  }

  if (conversionMode === null) {
    writeToConsole("Convm Error: No conversion mode set. Use 'convm day/hr/min/sec'")
    return
  }

  const value = parseFloat(trimmedInput)
  if (isNaN(value)) {
    writeToConsole("Convm Error: Invalid numeric input.")
    return
  }

  let result
  let unitRows = []

  switch (conversionMode) {
    case "day":
      result = daysconverter(value)
      unitRows = [
        { value: result.hour, label: "hours(hr)" },
        { value: result.minute, label: "minutes(min)" },
        { value: result.second, label: "seconds(sec)" }
      ]
      break
    case "hour":
      result = hoursconverter(value)
      unitRows = [
        { value: result.day, label: "days" },
        { value: result.minute, label: "minutes(min)" },
        { value: result.second, label: "seconds(sec)" }
      ]
      break
    case "minute":
      result = minutesconverter(value)
      unitRows = [
        { value: result.day, label: "days" },
        { value: result.hour, label: "hours(hr)" },
        { value: result.second, label: "seconds(sec)" }
      ]
      break
    case "second":
      result = secondsconverter(value)
      unitRows = [
        { value: result.day, label: "days" },
        { value: result.hour, label: "hours(hr)" },
        { value: result.minute, label: "minutes(min)" }
      ]
      break
  }

  const tableLines = [
    "+----------------------+",
    `| ${value} ${conversionMode}(s) =`.padEnd(22) + " |",
    "+----------------------+",
    "| Value  | Duration    |",
    "+----------------------+",
    ...unitRows.map(row =>
  `| ${String(Number(row.value.toFixed(5))).padEnd(7)}| ${row.label.padEnd(12)}|`
     ),
    "+----------------------+"
  ]

  writeToConsole(tableLines.join("\n"))
}
//Feature ui
export const dtcUI = `
 ____                    _____ _           
|    \\ ___ _ _    ___   |_   _|_|_____ ___
|  |  | .'| | |  |___|    | | | |     | -_|
|____/|__,|_  |           |_| |_|_|_|_|___|  _______
          |___|                             /  12   \\
 _____                     _               |    |    |
|     |___ ___ _ _ ___ ___| |_ ___ ___     |9   |   3|
|   --| . |   | | | -_|  _|  _| -_|  _|    |     \\   |
|_____|___|_|_|\\_/|___|_| |_| |___|_|       \\___6___/
                                            
+-----------------------------------------------------------+
|===========================================================|
| Day Time Converter                                        |
|                                                           |
| <==Operations==>                                          |
| [Type 'convm day' to access day-time conversion mode]     `.padEnd(59) + `|
| [Type 'convm hr' to access hour-time conversion mode]     `.padEnd(59) + `|
| [Type 'convm min' to access minute-time conversion mode]  `.padEnd(59) + `|
| [Type 'convm sec' to access second-time conversion mode]  `.padEnd(59) + `|
|===========================================================|
+-----------------------------------------------------------+
`
