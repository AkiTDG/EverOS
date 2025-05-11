
export function handleCommand(rawInput, context) {
    const {
        currentFeatureGetter,
        currentFeatureSetter,
        writeToConsole,
        calculator,
        calcUi,
        consoleDiv,
        homeMenu,
        helpMenu
    } = context;

    const command = rawInput.trim();
    const lowerCommand = command.toLowerCase();
    if (command === '') return;
    /*if (lowerCommand === 'exit') {
        if (currentFeatureGetter() === 'home') {
            writeToConsole('No feature is currently active.');
        } else {
            currentFeatureSetter('exit');
            writeToConsole('Feature closed successfully.');
        }
        return;
    }*/
    if (lowerCommand === 'clear') {
        consoleDiv.textContent = '';
        return;
    }
    if (lowerCommand === 'help') {
        writeToConsole(helpMenu);
        return;
    }
    if (lowerCommand.startsWith('nav ')) {
        const target = lowerCommand.substring(4);
        switch (target) {
            case 'home':
                currentFeatureSetter('home');
                writeToConsole(homeMenu);
                break;
            case 'calc':
                currentFeatureSetter('calculator');
                writeToConsole(calcUi);
                break;
            case 'msc':
                currentFeatureSetter('Metric system converter');
                writeToConsole('This feature is under implementation');
                break;
            case 'tc':
                currentFeatureSetter('Temperature converter');
                resetTempMode();
                writeToConsole(tcUi);
                break;
            case 'dtc':
                currentFeatureSetter('Day/Time converter');
                writeToConsole('This feature is under implementation');
                break;
            default:
                writeToConsole('Unknown feature. Type "help" for available commands.');
        }
        return;
    }
    if (currentFeatureGetter() === 'calculator') {
        calculator(command);
        return;
    }
    if (currentFeatureGetter() === 'Temperature converter') {
        const output=temperatureConverter(command);
        writeToConsole(output);
        return;
    }
    writeToConsole('Unknown command or wrong context. Type "help" for assistance.');
}
