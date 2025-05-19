//main handler of command logic
export function handleCommand(rawInput, context)
{
	const
	{   //functions/const extractor
		//important parts of OS
		currentFeatureGetter,currentFeatureSetter,
		writeToConsole,consoleDiv,
		//homeMenu,
		helpMenu,hometimeRenderer,
		//features
		calculator,calcUI,
		temperatureConverter,resetTempMode,tcUI,
		BMICalculator,bmiUI,
		converterLogic,resetConvMode,dtcUI
	} = context
//command ruling
	//input parser.ignores whitespaces when pressing enter
	const command = rawInput.trim()
	const lowerCommand = command.toLowerCase()
	if (command === "") return
	//OS commands
	if (lowerCommand==="clear"){
	consoleDiv.textContent = ""
	return
	}
	if (lowerCommand === "help")
	{
	writeToConsole(helpMenu)
	return
	}
	//navigation commands.mainly executes the feature's ui
	if (lowerCommand.startsWith("nav "))
	{
		const target = lowerCommand.substring(4)
		switch (target)
		{
		case "home":
			currentFeatureSetter("home")
			hometimeRenderer()
			break
		case "calc":
			currentFeatureSetter("calculator")
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
			BMICalculator("", writeToConsole)
			break
		case "dtc":
			currentFeatureSetter("Day time converter")
			resetConvMode()
			writeToConsole(dtcUI)
			break
		case "secret":
			currentFeatureSetter("unknown")
			setTimeout(function ()
			{
				window.location.href = "https://tinyurl.com/miku-miku-miku"
			}, 1e4)
			break
		default:
			writeToConsole('Unknown feature. Type "help" for available commands.')
		}
		return
	}
	//feature handler.executes feature's function
	if (currentFeatureGetter() === "calculator")
	{
		calculator(command)
		return
	}
	if (currentFeatureGetter() === "Temperature converter")
	{
		const output = temperatureConverter(command)
		writeToConsole(output)
		return
	}
	if (currentFeatureGetter() === "BMI calculator")
	{
		BMICalculator(command, writeToConsole)
		return
	}
	if (currentFeatureGetter() === "Day time converter") {
  		converterLogic(command, writeToConsole)
  		return
	}
	//throws error when command is unknown
	writeToConsole('Unknown command. Type "help" for assistance.')
}