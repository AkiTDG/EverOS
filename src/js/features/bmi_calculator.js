//processes the steps and values
function bmiValues() {
  return {
    step: 0,
    name: "",
    heightInput: "",
    weightInput: "",
    height: 0,
    weight: 0,
    result: "",
  }
}
//initial default state
let bmiState = null
//conversion constants
const m2cm = 0.01
const m2in = 0.0254
const m2ft = 0.3048
const lb2kg = 0.453592
//conversion parsers(height)
function parseHeight(value) {
  const input = value.trim().toLowerCase()
  if (input.endsWith("cm")) return parseFloat(input) * m2cm
  if (input.endsWith("m")) return parseFloat(input.replace("m", "").trim())
  if (input.endsWith("in")) return parseFloat(input) * m2in
  if (input.endsWith("ft") && !input.includes("in")) return parseFloat(input) * m2ft
  const ftInRegex = /(\d+)\s*(?:ft|')\s*(\d+)?\s*(?:in|")?/
  const match = input.match(ftInRegex)
  if (match) {
    const ft = parseInt(match[1])
    const inches = parseInt(match[2]) || 0
    return (ft * 12 + inches) * m2in
  }
  const val = parseFloat(input)
  return isNaN(val) ? NaN : val
}
//conversion parsers(weight)
function parseWeight(value) {
  const input = value.trim().toLowerCase()
  if (input.endsWith("kg")) return parseFloat(input.replace("kg", "").trim())
  if (input.endsWith("lbs") || input.endsWith("lb")) return parseFloat(input.replace(/lbs?|lb/, "").trim()) * lb2kg
  const val = parseFloat(input)
  return isNaN(val) ? NaN : val
}
//BMI formula
function BMIformula(weight, height) {
  return weight / (height * height)
}
//BMI classification
function BMIClassifier(bmi) {
  if (bmi < 18.5) return "[Underweight]"
  if (bmi < 24.9) return "[Normal weight]"
  if (bmi < 29.9) return "[Overweight]"
  return "[Obese]"
}
//gets present date
function getCurrentDate() {
  const now = new Date()
  return now.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) +
    ' ' + now.toLocaleTimeString('en-US')
}
//receipt used to record BMI
function receipt(name, height, weight, BMI) {
  const date = getCurrentDate()
  const receiptContent = `
+---------------------------------------+
|=======================================|
|     [Your official BMI Receipt]       |
|=======================================|
+---------------------------------------+
|=======================================|
|Name: ${name.toUpperCase().padEnd(33)}|
|Height: ${height.toUpperCase().padEnd(31)}|
|Weight: ${weight.toUpperCase().padEnd(31)}|
|BMI Status: ${BMI.toUpperCase().padEnd(27)}|
|Date Taken: ${date.toUpperCase().padEnd(27)}|
|=======================================|
|[This receipt is made on EverOS]       |
|[Do not edit]                          |
|=======================================|
+---------------------------------------+`
  const blob = new Blob([receiptContent], {type: 'text/plain'})
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
//Initializer.Everytime you navigate to BMI, this will be the first step
export function initBMI(writeToConsole) {
  bmiState = bmiValues()
  writeToConsole("\n[Enter your name]:")
}
//Whole BMI calculator workflow logic
export function BMICalculator(input, writeToConsole) {
  if (!bmiState) {
    writeToConsole("[Error: BMI feature not initialized properly. Type 'nav bmi' again.]")
    return
  }

  switch (bmiState.step) {
    case 0:
      bmiState.name = input
      bmiState.step = 1
      writeToConsole("[Enter your height]:")
      break
    case 1:
      bmiState.heightInput = input
      bmiState.height = parseHeight(input)
      if (isNaN(bmiState.height) || bmiState.height <= 0) {
        writeToConsole("[Error: Invalid height format.]")
        return
      }
      bmiState.step = 2
      writeToConsole("[Enter your weight]:")
      break
    case 2:
      bmiState.weightInput = input
      bmiState.weight = parseWeight(input)
      if (isNaN(bmiState.weight) || bmiState.weight <= 0) {
        writeToConsole("[Error: Invalid weight format.]")
        return
      }
      const bmi = BMIformula(bmiState.weight, bmiState.height)
      const status = BMIClassifier(bmi)
      const result = `\n[${bmiState.name}, your BMI is ${bmi.toFixed(2)}-${status}]`
      writeToConsole(result)
      bmiState.result = `${bmi.toFixed(2)}-${status}`
      bmiState.step = 3
      writeToConsole("[Would you like to save this as a record? (y/n)]:")
      break
    case 3:
      if (input.toLowerCase() === "y") {
        receipt(bmiState.name, bmiState.heightInput, bmiState.weightInput, bmiState.result)
        writeToConsole("[Thank you for using this feature. Your receipt is now downloaded.]\n")
      } else if (input.toLowerCase() === "n") {
        writeToConsole("[Thank you for using this feature.]\n")
      } else {
        writeToConsole("[Enter y or n only.]")
        return
      }
      writeToConsole("[Would you like to enter a new field? (y/n)]:")
      bmiState.step = 4
      break
    case 4:
      if (input.toLowerCase() === "y") {
        bmiState = bmiValues()
        writeToConsole("[Enter your name]:")
      } else if (input.toLowerCase() === "n") {
        bmiState = null
        writeToConsole("[Thank you for using BMI calculator. Type 'nav bmi' to start again.]\n")
      } else {
        writeToConsole("[Enter y or n only.]")
      }
      break
    default:
      writeToConsole("[Unexpected state. Resetting feature...]")
      bmiState = null
      break
  }
}
//User Interface for the feature
export const bmiUI = `
██████╗    ███╗   ███╗    ██╗    
██╔══██╗   ████╗ ████║    ██║    
██████╔╝   ██╔████╔██║    ██║    
██╔══██╗   ██║╚██╔╝██║    ██║    
██████╔╝   ██║ ╚═╝ ██║    ██║    
╚═════╝    ╚═╝     ╚═╝    ╚═╝    
 __                           
/   _  |  _     |  _ _|_ _  __
\\__(_| | (_ |_| | (_| |_(_) | 

+------------------------------------------------+
|================================================|
| Body Mass Index (BMI) Calculator               |
|                                                |
| <==Operations==>                               |
| [Enter your name first]                        |
| [Enter height next (Supports: cm, m, ft & in)] |
| [Then enter weight (Supports: kg & lbs)]       |
|================================================|
+------------------------------------------------+`
