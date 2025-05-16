//function/const import in-order for the features to work
import{handleCommand} from "./commandHandler.js"
import{homeMenu,helpMenu} from "./mainUI.js"
import{calculator,calcUi} from "../features/calculator.js"
import{temperatureConverter,resetTempMode,tcUi} from "../features/temperature_converter.js"
import{BMICalculator,bmiUi} from "../features/bmi_calculator.js"
//backbone of the console OS
const consoleDiv = document.getElementById("console")
const inputField = document.getElementById("input")
inputField.focus()
let currentFeature = "home"
//feature getter and setter
function getCurrentFeature(){return currentFeature}
function setCurrentFeature(value){currentFeature = value}
//write to console,works similarly to console.log
function writeToConsole(text)
{const consoleDiv = document.getElementById("console")
 consoleDiv.textContent += text + "\n"
 consoleDiv.scrollTop = consoleDiv.scrollHeight}
window.writeToConsole = writeToConsole
//handles functions from commandHandler.js
inputField.addEventListener("keydown", function (event)
{
if (event.key === "Enter")
   {
	const command = inputField.value
	if (command.trim() !== "")
		{
		  writeToConsole(">> " + command)
		}
		handleCommand(command,
		{
		currentFeatureGetter: getCurrentFeature,
		currentFeatureSetter: setCurrentFeature,
		writeToConsole: writeToConsole,
		consoleDiv: consoleDiv,	
		homeMenu: homeMenu(),
		helpMenu: helpMenu,
		calculator: calculator,calcUi: calcUi,
		temperatureConverter: temperatureConverter,resetTempMode: resetTempMode,tcUi: tcUi,
		BMICalculator: BMICalculator, bmiUi: bmiUi
		})
		inputField.value = ""
	}
//shortcut keys for "nav home" and "clear" commands
if (event.key === "Delete"){
	consoleDiv.textContent = ""
	return
}
if (event.key === "Home"){
	writeToConsole(homeMenu())
	return
}   
})
//displays home menu at the startup
writeToConsole(homeMenu())