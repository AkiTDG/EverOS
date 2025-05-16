let bmiState = {
  step :0,
  name: "",
  heightInput: "",
  weightInput: "",
  height: 0,
  weight: 0,
}
//for height conversion
const m2cm = 0.01
const m2in = 0.0254
const m2ft = 0.3048
//for weight conversion
const lb2kg = 0.453592
//heightparser/converter
function parseHeight(value) {
  const input = value.trim().toLowerCase()
  if (input.endsWith("cm")) {
    const cm = parseFloat(input)
    return cm * m2cm
  }
  if (input.endsWith("m")) {
     return parseFloat(input.replace("m", "").trim());
  }
  if (input.endsWith("in")) {
    const inches = parseFloat(input)
    return inches * m2in
  }
  if (input.endsWith("ft") && !input.includes("in")) {
    const ft = parseFloat(input)
    return ft * m2ft
  }
  const ftInRegex = /(\d+)\s*(?:ft|')\s*(\d+)?\s*(?:in|")?/
  const match = input.match(ftInRegex)
  if (match) {
    const ft = parseInt(match[1])
    const inches = parseInt(match[2]) || 0
    return (ft * 12 + inches) * m2in
  }
  const val = parseFloat(input)
  if (!isNaN(val)) return val
  return NaN
}
//weight parser/converter
function parseWeight(value) {
  const input = value.trim().toLowerCase()
  if (input.endsWith("kg")) return parseFloat(input.replace("kg", "").trim())
  if (input.endsWith("lbs") || input.endsWith("lb"))  
    return parseFloat(input.replace(/lbs?|lb/, "").trim()) * lb2kg
  const val = parseFloat(input)
  if (!isNaN(val)) return val
  return NaN
}
//self-explanatory
function BMIformula(weight, height) {
  return weight / (height * height)
}
//self-explanatory
function BMIClassifier(bmi) {
  if (bmi < 18.5 || bmi < 19) return "[Underweight]"
  if (bmi >= 18.5 && bmi < 25) return "[Normal weight]"
  if (bmi >= 25 && bmi < 30) return "[Overweight]"
  if (bmi >= 30) return "[Obese]"
  return "[Unknown]"
}
//fetches current date to put in the receipt
function getCurrentDate() {
const now = new Date()
return now.toLocaleDateString
('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) +
' ' + now.toLocaleTimeString('en-US')
}
//receipt (saved as txt file)
function receipt (name,height,weight,BMI){
const date = getCurrentDate()
const receiptContent = `
+---------------------------------------+
|=======================================|
|${'     [Your official BMI Receipt]'.padEnd(39)}|
|=======================================|
+---------------------------------------+

+---------------------------------------+
|=======================================|
|Name: ${name.toUpperCase().padEnd(33)}|
|=======================================|
|Height: ${height.toUpperCase().padEnd(31)}|
|Weight: ${weight.toUpperCase().padEnd(31)}|
|BMI Status: ${BMI.toUpperCase().padEnd(27)}|
|Date Taken: ${date.toUpperCase().padEnd(27)}|
|=======================================|
|${'[This receipt is made on EverOS]'.padEnd(39)}|
|=======================================|
+---------------------------------------+`
const blob = new Blob([receiptContent], { type: 'text/plain' })
const url = URL.createObjectURL(blob)
const a = document.createElement('a')
const filename = `BMI_${name.replace(/\s+/g, "_")}_${date.replace(/[:\s]/g, "-")}.txt`
a.href = url
a.download = filename
document.body.appendChild(a)
a.click()
setTimeout(() => {
document.body.removeChild(a)
URL.revokeObjectURL(url)
}, 0)
}
export function BMICalculator(input, writeToConsole) {
  switch (bmiState.step) {
    case 0:
      writeToConsole("[Enter your name]:")
      bmiState.step = 1
      break
    case 1:
      bmiState.name = input
      writeToConsole("[Enter your height]:")
      bmiState.step = 2
      break
    case 2:
      bmiState.heightInput = input
      bmiState.height = parseHeight(input)
      if (isNaN(bmiState.height) || bmiState.height <= 0) {
        writeToConsole("[Error: Invalid height format. Try again:]")
        return
      }
      writeToConsole("[Enter your weight]:")
      bmiState.step = 3
      break
    case 3:
      bmiState.weightInput = input
      bmiState.weight = parseWeight(input)
      if (isNaN(bmiState.weight) || bmiState.weight <= 0) {
        writeToConsole("[Error: Invalid weight format. Try again:]")
        return
      }
      const bmi = BMIformula(bmiState.weight, bmiState.height)
      const status = BMIClassifier(bmi)
      const result = `[${bmiState.name}, your BMI is ${bmi.toFixed(2)}-${status}]`
      writeToConsole(result)
      bmiState.result = `${bmi.toFixed(2)}-${status}`
      writeToConsole("[Would you like to save this as a record? (y/n)]:")
      bmiState.step = 4
      break
    case 4:
      if (input.toLowerCase() === 'y') {
        receipt(bmiState.name, bmiState.heightInput, bmiState.weightInput, bmiState.result)
        writeToConsole("[Thank you for using this feature.]\n")
      bmiState = { step: 0 }
      }
      else if (input.toLowerCase() === 'n') {
        writeToConsole("[Thank you for using this feature.]\n")
        bmiState = { step: 0 }
      }
      else {writeToConsole("[Enter y or n only.]")}
      break
    default:
      writeToConsole("[Unexpected state. Resetting...]")
      bmiState = { step: 0 }
  }
}

export const bmiUi = `
+------------------------------------------------+
|================================================|
| Body Mass Index (BMI) Calculator               |
|                                                |
| <==Operations==>                               |
| [Enter name first]                             |
| [Enter height next (Supports: cm, m, ft & in)] |
| [Then enter weight (Supports: kg & lbs)]       |
|================================================|
+------------------------------------------------+`