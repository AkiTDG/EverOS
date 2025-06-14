
//main handler of command logic
export function handleCommand(rawInput, context)
{
	const
	{   //functions/const extractor
		//important parts of OS
		currentFeatureGetter,currentFeatureSetter,
		writeToConsole,consoleDiv,
		//Deprecated->homeMenu,		
		helpMenu,hometimeRenderer,mainMenu,
		//features
		calculator,calcUI,
		temperatureConverter,resetTempMode,tcUI,
		BMICalculator,initBMI,bmiUI,
		converterLogic,resetConvMode,dtcUI,
		PingPong,cleanupPingPong,endGame,pongInit,ponghasStart,pingpongUI,
		//ArtRandomizer,
		runAnimation,stopHandlerKey,stopAnimation
	} = context
	stopAnimation()
	if (!context.ponghasStart) cleanupPingPong()
	document.removeEventListener("keydown", stopHandlerKey)
	//command ruling
	const command = rawInput.trim()
	const lowerCommand = command.toLowerCase()
	if (command === "" && context.ponghasStart) return
	//OS commands
	if (lowerCommand === "clear") {
		currentFeatureSetter("Home")
		stopAnimation()
		consoleDiv.textContent = ""
		return
	}
	if (lowerCommand === "help") {
		consoleDiv.innerHTML=helpMenu
		return
	}
	if (lowerCommand === "exit") {
		const currentFeature = currentFeatureGetter()
		if (currentFeature === "Test Animation")stopAnimation()
		if (!currentFeature || currentFeature === "Home") {
			writeToConsole("\nThere is no feature to exit from.")
			return
		}
		if (currentFeature === "PingPong") endGame()
		if (currentFeature === "BMI calculator") {import("../features/bmi_calculator.js").then(module => {module.BMIflow = true})}
		writeToConsole('\nExited feature successfully.')
		currentFeatureSetter("Home")
		return
	}
	if (command.trim() === '+-*/%'){
		currentFeatureSetter("Animation tester")
		runAnimation(writeToConsole)
    	return
	}
	//navigation commands.mainly executes the feature's ui
	if (lowerCommand.startsWith("nav ")) {
		const target = lowerCommand.substring(4)
		switch (target) {
			case "home":
				currentFeatureSetter("Home")
				hometimeRenderer()
				break
			case "calc":
				currentFeatureSetter("Calculator")
				consoleDiv.innerHTML=calcUI
				break
			case "menu":
				currentFeatureSetter("Home")
				consoleDiv.innerHTML=mainMenu
				break
			case "tc":
				currentFeatureSetter("Temperature converter")
				resetTempMode()
				consoleDiv.innerHTML=tcUI
				break
			case "bmi":
				currentFeatureSetter("BMI calculator")
				consoleDiv.innerHTML=bmiUI
				initBMI(writeToConsole) 
				break
			case "dtc":
				currentFeatureSetter("Day time converter")
				resetConvMode()
				consoleDiv.innerHTML=dtcUI
				break
			case "pong":
				currentFeatureSetter("PingPong")
				pongInit()
				break
			case "secret":
				currentFeatureSetter("unknown")
				setTimeout(function() {
					window.location.href = "https://tinyurl.com/miku-miku-miku"
				}, 1e4)
				writeToConsole('Unknown feature. Type "help" for available commands.')
				break
			default:
				writeToConsole('Unknown feature. Type "help" for available commands.')
		}
		return
	}
	//feature handler.executes feature's function
	const currentFeature = currentFeatureGetter()
	if (currentFeature === "Calculator") {
		calculator(command)
		return
	}
	if (currentFeature === "Temperature converter") {
		const output = temperatureConverter(command)
		writeToConsole(output)
		return
	}
	if (currentFeature === "BMI calculator") {
		BMICalculator(command, writeToConsole)
		return
	}
	if (currentFeature === "Day time converter") {
		converterLogic(command, writeToConsole)
		return
	}
	//throws error when command is unknown
	writeToConsole('Unknown command. Type "help" for assistance.')
}
