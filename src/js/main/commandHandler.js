//main handler of command logic
export function handleCommand(rawInput, context)
{
	const
	{   //functions/const extractor
		//important parts of OS
		currentFeatureGetter,currentFeatureSetter,
		writeToConsole,consoleDiv,
		//Deprecated->homeMenu,		
		helpMenu,hometimeRenderer,
		//features
		calculator,calcUI,
		temperatureConverter,resetTempMode,tcUI,
		BMICalculator,initBMI,bmiUI,
		converterLogic,resetConvMode,dtcUI,
		PingPong,cleanupPingPong
	} = context
	cleanupPingPong();
	//command ruling
	const command = rawInput.trim()
	const lowerCommand = command.toLowerCase()
	if (command === "") return

	//OS commands
	if (lowerCommand === "clear") {
		currentFeatureSetter("Home")
		consoleDiv.textContent = ""
		return
	}

	if (lowerCommand === "help") {
		writeToConsole(helpMenu)
		return
	}

	if (lowerCommand === "exit") {
		const currentFeature = currentFeatureGetter()
		if (!currentFeature || currentFeature === "Home") {
			writeToConsole("\nYou can't exit in home/cleared screen or feature you just exited.")
			return
		}
		if (currentFeature === "BMI calculator") {
		import("../features/bmi_calculator.js").then(module => {
			module.BMIflow = true
		})
	}
		writeToConsole('\nExited feature successfully.')
		currentFeatureSetter("Home")
		return
	}

	//navigation commands.mainly executes the feature's ui
	if (lowerCommand.startsWith("nav ")) {
		const target = lowerCommand.substring(4)
		switch (target) {
			case "home":
				currentFeatureSetter("Home")
				hometimeRenderer()
				window.onload=function(){window.scrollTo(0,0)}
				break
			case "calc":
				currentFeatureSetter("Calculator")
				writeToConsole(calcUI)
				break
			case "tc":
				currentFeatureSetter("Temperature converter")
				resetTempMode()
				writeToConsole(tcUI)
				break
			case "bmi":
				currentFeatureSetter("BMI calculator")
				writeToConsole(bmiUI)
				initBMI(writeToConsole) 
				break
			case "dtc":
				currentFeatureSetter("Day time converter")
				resetConvMode()
				writeToConsole(dtcUI)
				break
			case "pong":
				currentFeatureSetter("PingPong")
				PingPong()
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
