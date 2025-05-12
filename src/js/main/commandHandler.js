export function handleCommand(rawInput, context)
{
	const
	{
		currentFeatureGetter,currentFeatureSetter,
		writeToConsole,consoleDiv,
		homeMenu,helpMenu,
		calculator,calcUi,
		temperatureConverter,resetTempMode,tcUi,
		measurementConverter,mscUI
	} = context;
	const command = rawInput.trim();
	const lowerCommand = command.toLowerCase();
	if (command === "") return;
	if (lowerCommand === "clear")
	{
		consoleDiv.textContent = "";
		return
	}
	if (lowerCommand === "help")
	{
		writeToConsole(helpMenu);
		return
	}
	if (lowerCommand.startsWith("nav "))
	{
		const target = lowerCommand.substring(4);
		switch (target)
		{
		case "home":
			currentFeatureSetter("home");
			writeToConsole(homeMenu);
			break;
		case "calc":
			currentFeatureSetter("calculator");
			writeToConsole(calcUi);
			break;
		case "msc":
			currentFeatureSetter("Measurement system converter");
			writeToConsole(mscUI);
			break;
		case "tc":
			currentFeatureSetter("Temperature converter");
			resetTempMode();
			writeToConsole(tcUi);
			break;
		case "dtc":
			currentFeatureSetter("Day/Time converter");
			writeToConsole("This feature is under implementation");
			break;
		case "secret":
			currentFeatureSetter("unknown");
			setTimeout(function ()
			{
				window.location.href = "https://tinyurl.com/miku-miku-miku"
			}, 1e4);
		default:
			writeToConsole('Unknown feature. Type "help" for available commands.')
		}
		return
	}
	if (currentFeatureGetter() === "calculator")
	{
		calculator(command);
		return
	}
	if (currentFeatureGetter() === "Temperature converter")
	{
		const output = temperatureConverter(command);
		writeToConsole(output);
		return
	}
	if (currentFeatureGetter() === "Measurement system converter"){
		measurementConverter(command)
		return
	}
	writeToConsole('Unknown command or wrong context. Type "help" for assistance.')
}
