//function/const import in-order for the features to work
import{handleCommand} from "./commandHandler.js"
import{homeMenu,helpMenu} from "./mainUI.js"
import{calculator,calcUI} from "../features/calculator.js"
import{temperatureConverter,resetTempMode,tcUI} from "../features/temperature_converter.js"
import{BMICalculator,bmiUI} from "../features/bmi_calculator.js"
import{converterLogic,resetConvMode,dtcUI} from "../features/daytime_converter.js"
import{PingPong,cleanupPingPong} from "../features/games/pong.js"
//backbone of the console OS
const consoleDiv = document.getElementById("console")
const inputField = document.getElementById("input")
inputField.focus()
let currentFeature = "Home"
//feature getter and setter
function getCurrentFeature(){return currentFeature}
function setCurrentFeature(value){currentFeature = value}
//write to console,works similarly to console.log
function writeToConsole(text)
{const consoleDivWriter = document.getElementById("console")
 consoleDivWriter.textContent += text + "\n"
 consoleDivWriter.scrollTo(0, consoleDivWriter.scrollHeight)
}window.writeToConsole = writeToConsole
function updateTime() {
const timeSpan = document.getElementById('time-display')
if (timeSpan) {
	timeSpan.textContent = new Date().toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
    })
  }
}
function hometimeRenderer(){
	consoleDiv.innerHTML = homeMenu()
    clearInterval(window.timeUpdater)
    window.timeUpdater = setInterval(updateTime,1000)
}
//handles functions from commandHandler.js
inputField.addEventListener("keydown", function (event)
{
if (event.key === "Enter")
   {
	const command = inputField.value
	if (command.trim() !== ""){writeToConsole("\nEverOS/"+getCurrentFeature()+">> "+command)}
	handleCommand(command,
	   {currentFeatureGetter: getCurrentFeature,
		currentFeatureSetter: setCurrentFeature,
		writeToConsole,consoleDiv,	
		homeMenu,hometimeRenderer,helpMenu,
		calculator,calcUI,
		temperatureConverter,resetTempMode,tcUI,
		BMICalculator,bmiUI,
		converterLogic,resetConvMode,dtcUI
	    ,PingPong,cleanupPingPong
	})
	inputField.value=""
	}
//shortcut keys for "nav home" and "clear" commands
//PC Button keys
if (event.key === "Delete"){
	setCurrentFeature("Home")
	consoleDiv.textContent = ""
	return
}
if (event.key === "Home"){
	setCurrentFeature("Home")
	consoleDiv.innerHTML=homeMenu()
	hometimeRenderer()
	return
} 
if (event.key === "End") {
	const currentFeature = getCurrentFeature()
	if (currentFeature && currentFeature !== "Home") {
		writeToConsole('\nExited feature successfully.')
		setCurrentFeature("Home")
	} else {
		writeToConsole("\nYou can't exit in home/cleared screen or feature you just exited.")
	}
  }
})

//PROGRAM-SPECIFIC BUTTONS
	document.getElementById("btn-del").addEventListener("click", () => {
		if (getCurrentFeature() === "PingPong") cleanupPingPong()
    	setCurrentFeature("Home")
		consoleDiv.textContent = ""
		return
	})
	document.getElementById("btn-home").addEventListener("click", () => {	
		if (getCurrentFeature() === "PingPong") cleanupPingPong()
   		setCurrentFeature("Home")
    	consoleDiv.innerHTML = homeMenu()
    	hometimeRenderer()
	})
	document.getElementById("btn-end").addEventListener("click", () => {
    const currentFeature = getCurrentFeature()
    	if (currentFeature && currentFeature !== "Home") {
			if (currentFeature === "PingPong") cleanupPingPong()
        	writeToConsole('\nExited feature successfully.')
        	setCurrentFeature("Home")
    	} 	
		else {writeToConsole("\nYou can't exit in home/cleared screen or feature you just exited.")}
	})
	document.querySelectorAll(".op-btn").forEach(button => {
    	button.addEventListener("click", () => {
        	inputField.value += button.textContent.trim()
        	inputField.focus()
    	})
	})

//displays home menu at the startup
hometimeRenderer()
window.onload=function(){window.scrollTo(0,0)}