import {calculator} from '../features/calculator.js';

const consoleDiv = document.getElementById('console');
const inputField = document.getElementById('input');

let currentFeature = 'home';
 
const asciitext = `
 /$$$$$$$$                              /$$$$$$   /$$$$$$ 
| $$_____/                             /$$__  $$ /$$__  $$
| $$    /$$    /$$ /$$$$$$   /$$$$$$  | $$  \\ $$| $$  \\__/
| $$$$$|  $$  /$$//$$__  $$ /$$__  $$ | $$  | $$|  $$$$$$ 
| $$__/ \\  $$/$$/| $$$$$$$$| $$  \\__/ | $$  | $$ \\____  $$
| $$     \\  $$$/ | $$_____/| $$       | $$  | $$ /$$  \\ $$
| $$$$$$$$\\  $/  |  $$$$$$$| $$       |  $$$$$$/|  $$$$$$/
|________/ \\_/    \\_______/|__/        \\______/  \\______/ 
`;

const homeMenu = `
+--------------------------------------------+
| Features:                                  |
|                                            |
| [1. Date       ]                           |
| [2. Time       ]                           |
| [3. Calculator ]                           |
|                                            |
| Type "help" for important commands         |
| Press F5 to restart OS                     |
+--------------------------------------------+`;

const helpText = `
+------------------------------------------------------------------------+
|                                                                        |
| Available commands:                                                    |
| [nav [feature]: Navigate to a feature (date, time, calculator)]        |
| [exit: Exit current feature                                   ]        |
| [nav home: Go to home menu                                    ]        |
| [clear: Clear the console                                     ]        |
|                                                                        |
+------------------------------------------------------------------------+`;

function writeToConsole(text) {
    const consoleDiv = document.getElementById('console');
    consoleDiv.textContent += text + '\n';
    consoleDiv.scrollTop = consoleDiv.scrollHeight;
}window.writeToConsole = writeToConsole;

function handleCommand(rawInput) {
    const command = rawInput.trim();
    const lowerCommand = command.toLowerCase();
    if (command === '') return;
    if (lowerCommand.startsWith('nav ')) {
        const target = lowerCommand.substring(4);
        switch (target) {
            case 'home':
                currentFeature = 'home';
                writeToConsole(homeMenu);
                break;
            case 'help':
                writeToConsole(helpText);
                break;
            case 'date':
                currentFeature = 'date';
                writeToConsole('Date: ' + new Date().toLocaleDateString());
                break;
            case 'time':
                currentFeature = 'time';
                writeToConsole('Time: ' + new Date().toLocaleTimeString());
                break;
            case 'calc':
                currentFeature = 'calculator';
                writeToConsole('Entered Calculator mode. \nType "exit" to leave.');
                break;
            default:
                writeToConsole('Unknown feature. Type "help" for available commands.');
        }
        return;
    }
    if (lowerCommand === 'clear') {
        consoleDiv.textContent = '';
        return;
    }
    if (lowerCommand === 'help') {
        writeToConsole(helpText);
        return;
    }
    if (lowerCommand === 'exit') {
        if (currentFeature === 'home' || currentFeature === 'exit'){
        writeToConsole('No feature is currently active.')
    }
        else {currentFeature = 'exit';
        writeToConsole('Feature closed successfully.');        
    }return;
    }
    if (currentFeature === 'calculator') {
        calculator(command);
        return;
    }

    writeToConsole('Unknown command or wrong context. Type "help" for assistance.');
}


inputField.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        const command = inputField.value;
        if (command.trim() !== '') {
            writeToConsole('>> ' + command);
        }
        handleCommand(command);
        inputField.value = '';
    }
});

writeToConsole(asciitext);
writeToConsole('+--------------------------------------------+');
writeToConsole('|    =======[Welcome to EverOS!]=======      |');
writeToConsole('+--------------------------------------------+');
writeToConsole(homeMenu);
