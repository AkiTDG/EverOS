//function/const import in-order for the features to work
import{handleCommand} from "./commandHandler.js"
import{homeMenu,helpMenu} from "./mainUI.js"
import{calculator,calcUI} from "../features/calculator.js"
import{temperatureConverter,resetTempMode,tcUI} from "../features/temperature_converter.js"
import{BMICalculator,bmiUI} from "../features/bmi_calculator.js"
import{converterLogic,resetConvMode,dtcUI} from "../features/daytime_converter.js"
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
{const consoleDivWriter = document.getElementById("console")
 consoleDivWriter.textContent += text + "\n"
 //consoleDivWriter.scrollTop = 0 ,consoleDivWriter.scrollHeight
 consoleDivWriter.scrollTo(0, consoleDivWriter.scrollHeight)
}window.writeToConsole = writeToConsole
function updateTime() {
const timeSpan = document.getElementById('time-display');
if (timeSpan) {
	timeSpan.textContent = new Date().toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
    });
  }
}setInterval(updateTime,1000)
function hometimeRenderer(){
	consoleDiv.innerHTML = homeMenu();
    clearInterval(window.timeUpdater);
    window.timeUpdater = setInterval(updateTime,1000);
}
//handles functions from commandHandler.js
inputField.addEventListener("keydown", function (event)
{
if (event.key === "Enter")
   {
	const command = inputField.value
	if (command.trim() !== ""){writeToConsole("\n>> " + command)}
	handleCommand(command,
	   {currentFeatureGetter: getCurrentFeature,
		currentFeatureSetter: setCurrentFeature,
		writeToConsole: writeToConsole,
		consoleDiv: consoleDiv,	
		homeMenu: homeMenu,
		hometimeRenderer:hometimeRenderer,
		helpMenu: helpMenu,
		calculator: calculator,calcUI: calcUI,
		temperatureConverter: temperatureConverter,resetTempMode: resetTempMode,tcUI: tcUI,
		BMICalculator: BMICalculator, bmiUI: bmiUI,
		converterLogic: converterLogic, resetConvMode: resetConvMode, dtcUI: dtcUI})
	inputField.value = ""
	}
//shortcut keys for "nav home" and "clear" commands
if (event.key === "Delete"){
	consoleDiv.textContent = ""
	return
}
if (event.key === "Home"){
	consoleDiv.innerHTML=homeMenu()
	hometimeRenderer()
	return
}   
})
//displays home menu at the startup
hometimeRenderer()
window.onload=function(){window.scrollTo(0,0)}