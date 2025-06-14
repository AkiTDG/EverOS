
//function/const import in-order for the features to work
import{handleCommand} from "./commandHandler.js"
import{homeMenu,helpMenu,mainMenu} from "./mainUI.js"
import{calculator,calcUI} from "../features/calculator/calculator.js"
import{temperatureConverter,resetTempMode,tcUI} from "../features/temperature_converter.js"
import{BMICalculator,bmiUI,initBMI} from "../features/bmi_calculator.js"
import{converterLogic,resetConvMode,dtcUI} from "../features/daytime_converter.js"
import{PingPong,cleanupPingPong,endGame,pingpongUI,pongInit,ponghasStart} from "../features/games/pong.js"
import{runAnimation,stopHandlerKey,stopAnimation} from "../features/experimental/testASCIIAnimation.js"
//backbone of the console OS
const consoleDiv = document.getElementById("console")
const inputField = document.getElementById("input")
inputField.focus()
let currentFeature = "Home"
//feature getter and setter
function getCurrentFeature(){return currentFeature}
function setCurrentFeature(value){currentFeature = value}
//write to console,works similarly to console.log
function writeToConsole(text){
	const consoleDivWriter = document.getElementById("console")
 	consoleDivWriter.innerHTML += text.replace(/\n/g, "<br>")+"<br>"
 	consoleDivWriter.scrollTo(0, consoleDivWriter.scrollHeight)
}
window.writeToConsole = writeToConsole
//Gets time to be displayed on the Home Menu.
function updateTime() {
const timeSpan = document.getElementById('display-time')
if (timeSpan) {
	timeSpan.textContent = new Date().toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
    })
  }
}
//Renders home menu,together with updated time
function hometimeRenderer(){
	consoleDiv.innerHTML = homeMenu()
    clearInterval(window.timeUpdater)
    window.timeUpdater = setInterval(updateTime,1000)
	updateTime()
}
//handles functions from commandHandler.js
inputField.addEventListener("keydown", function (event)
{
if (event.key === "Enter")
   {
	const command = inputField.value
	if (command.trim() !== "") {writeToConsole("\nEverOS/" + currentFeature + ">> " + command)
	handleCommand(command,
	   {currentFeatureGetter: getCurrentFeature,
		currentFeatureSetter: setCurrentFeature,
		writeToConsole,consoleDiv,	
		homeMenu,hometimeRenderer,helpMenu,mainMenu,
		calculator,calcUI,
		temperatureConverter,resetTempMode,tcUI,
		BMICalculator,initBMI,bmiUI,
		converterLogic,resetConvMode,dtcUI
	    ,PingPong,cleanupPingPong,endGame,pongInit,ponghasStart,pingpongUI
		,runAnimation,stopHandlerKey,stopAnimation
	})} 
	else if (currentFeature === "Home") {writeToConsole("EverOS/Home>> ")}
	inputField.value=""
	}
//shortcut keys for "nav home" and "clear" commands
//PC Button keys
if (event.key === "Delete"){
	setCurrentFeature("Home")
	cleanupPingPong()
	stopAnimation()
	consoleDiv.textContent = ""
	return
}
if (event.key === "Home"){
	setCurrentFeature("Home")
	stopAnimation()
	cleanupPingPong()
	hometimeRenderer()
	return
} 
if (event.key === "End") {
	const currentFeature = getCurrentFeature()
		stopAnimation()
		if (currentFeature && currentFeature !== "Home") {
			if (getCurrentFeature() === "PingPong") endGame()
			cleanupPingPong()	
			writeToConsole('\nExited feature successfully.')
			setCurrentFeature("Home")
		} 
		else {writeToConsole("\nThere is no feature to exit from.")}
  }
})
//PROGRAM-SPECIFIC BUTTONS
	document.getElementById("btn-del").addEventListener("click", () => {
		stopAnimation()
		if (getCurrentFeature() === "PingPong") cleanupPingPong()
		if (getCurrentFeature() === "Test Animation") stopAnimation()
    	setCurrentFeature("Home")
		consoleDiv.textContent = ""
		return
	})
	document.getElementById("btn-home").addEventListener("click", () => {	
		stopAnimation()
		if (getCurrentFeature() === "PingPong") cleanupPingPong()
		if (getCurrentFeature() === "Test Animation") stopAnimation()
   		setCurrentFeature("Home")
    	hometimeRenderer()
	})
	document.getElementById("btn-end").addEventListener("click", () => {
    	const currentFeature = getCurrentFeature()
		stopAnimation()
		if (currentFeature && currentFeature !== "Home") {
			if (getCurrentFeature() === "PingPong") endGame()
			cleanupPingPong()	
			writeToConsole('\nExited feature successfully.')
			setCurrentFeature("Home")
		} 
		else {writeToConsole("\nThere is no feature to exit from.")}
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
=======
//function/const import in-order for the features to work
import{handleCommand} from "./commandHandler.js"
import{homeMenu,helpMenu,mainMenu} from "./mainUI.js"
import{calculator,calcUI} from "../features/calculator.js"
import{temperatureConverter,resetTempMode,tcUI} from "../features/temperature_converter.js"
import{BMICalculator,bmiUI,initBMI} from "../features/bmi_calculator.js"
import{converterLogic,resetConvMode,dtcUI} from "../features/daytime_converter.js"
import{PingPong,cleanupPingPong,endGame,pingpongUI,pongInit,ponghasStart} from "../features/games/pong.js"
import{runAnimation,stopHandlerKey,stopAnimation} from "../features/experimental/testASCIIAnimation.js"
//backbone of the console OS
const consoleDiv = document.getElementById("console")
const inputField = document.getElementById("input")
inputField.focus()
let currentFeature = "Home"
//feature getter and setter
function getCurrentFeature(){return currentFeature}
function setCurrentFeature(value){currentFeature = value}
//write to console,works similarly to console.log
function writeToConsole(text){
	const consoleDivWriter = document.getElementById("console")
 	consoleDivWriter.innerHTML += text.replace(/\n/g, "<br>")+"<br>"
 	consoleDivWriter.scrollTo(0, consoleDivWriter.scrollHeight)
}
window.writeToConsole = writeToConsole
//Gets time to be displayed on the Home Menu.
function updateTime() {
const timeSpan = document.getElementById('display-time')
if (timeSpan) {
	timeSpan.textContent = new Date().toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
    })
  }
}
//Renders home menu,together with updated time
function hometimeRenderer(){
	consoleDiv.innerHTML = homeMenu()
    clearInterval(window.timeUpdater)
    window.timeUpdater = setInterval(updateTime,1000)
	updateTime()
}
//handles functions from commandHandler.js
inputField.addEventListener("keydown", function (event)
{
if (event.key === "Enter")
   {
	const command = inputField.value
	if (command.trim() !== "") {writeToConsole("\nEverOS/" + currentFeature + ">> " + command)
	handleCommand(command,
	   {currentFeatureGetter: getCurrentFeature,
		currentFeatureSetter: setCurrentFeature,
		writeToConsole,consoleDiv,	
		homeMenu,hometimeRenderer,helpMenu,mainMenu,
		calculator,calcUI,
		temperatureConverter,resetTempMode,tcUI,
		BMICalculator,initBMI,bmiUI,
		converterLogic,resetConvMode,dtcUI
	    ,PingPong,cleanupPingPong,endGame,pongInit,ponghasStart,pingpongUI
		,runAnimation,stopHandlerKey,stopAnimation
	})} 
	else if (currentFeature === "Home") {writeToConsole("EverOS/Home>> ")}
	inputField.value=""
	}
//shortcut keys for "nav home" and "clear" commands
//PC Button keys
if (event.key === "Delete"){
	setCurrentFeature("Home")
	cleanupPingPong()
	stopAnimation()
	consoleDiv.textContent = ""
	return
}
if (event.key === "Home"){
	setCurrentFeature("Home")
	stopAnimation()
	cleanupPingPong()
	hometimeRenderer()
	return
} 
if (event.key === "End") {
	const currentFeature = getCurrentFeature()
		stopAnimation()
		if (currentFeature && currentFeature !== "Home") {
			if (getCurrentFeature() === "PingPong") endGame()
			cleanupPingPong()	
			writeToConsole('\nExited feature successfully.')
			setCurrentFeature("Home")
		} 
		else {writeToConsole("\nThere is no feature to exit from.")}
  }
})
//PROGRAM-SPECIFIC BUTTONS
	document.getElementById("btn-del").addEventListener("click", () => {
		stopAnimation()
		if (getCurrentFeature() === "PingPong") cleanupPingPong()
		if (getCurrentFeature() === "Test Animation") stopAnimation()
    	setCurrentFeature("Home")
		consoleDiv.textContent = ""
		return
	})
	document.getElementById("btn-home").addEventListener("click", () => {	
		stopAnimation()
		if (getCurrentFeature() === "PingPong") cleanupPingPong()
		if (getCurrentFeature() === "Test Animation") stopAnimation()
   		setCurrentFeature("Home")
    	hometimeRenderer()
	})
	document.getElementById("btn-end").addEventListener("click", () => {
    	const currentFeature = getCurrentFeature()
		stopAnimation()
		if (currentFeature && currentFeature !== "Home") {
			if (getCurrentFeature() === "PingPong") endGame()
			cleanupPingPong()	
			writeToConsole('\nExited feature successfully.')
			setCurrentFeature("Home")
		} 
		else {writeToConsole("\nThere is no feature to exit from.")}
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

