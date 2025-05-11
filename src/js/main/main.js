import {calculator,calcUi} from '../features/calculator.js';
import {handleCommand} from './commandHandler.js';
import {asciitext,homeMenu,helpMenu} from './mainUI.js';

//Console backbone
const consoleDiv = document.getElementById('console');
const inputField = document.getElementById('input');
let currentFeature = 'home';
function getCurrentFeature() {
    return currentFeature;
}
function setCurrentFeature(value) {
    currentFeature = value;
}

//U.I. backbone
function writeToConsole(text) {
    const consoleDiv = document.getElementById('console');
    consoleDiv.textContent += text + '\n';
    consoleDiv.scrollTop = consoleDiv.scrollHeight;
}window.writeToConsole = writeToConsole;

//input logic
inputField.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        const command = inputField.value;
        if (command.trim() !== '') {
            writeToConsole('>> ' + command);
        }
        handleCommand(command, {
            currentFeatureGetter: getCurrentFeature,
            currentFeatureSetter: setCurrentFeature,
            writeToConsole,
            calculator,
            consoleDiv,
            homeMenu,
            helpMenu,
            calcUi
        });

        inputField.value = '';
    }
});

writeToConsole(asciitext);
writeToConsole('+--------------------------------------------------+');
writeToConsole('|==================================================|');
writeToConsole('|        =======[Welcome to EverOS!]=======        |');
writeToConsole('| Today is:   ' + new Date().toLocaleDateString().padEnd(37) + '|');
writeToConsole('| Time check: ' + new Date().toLocaleTimeString(undefined, {
  hour: '2-digit',
  minute: '2-digit',
}).padEnd(37) + '|');
writeToConsole('|==================================================|');
writeToConsole('+--------------------------------------------------+');
writeToConsole(homeMenu);
