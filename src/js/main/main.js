import {calculator,calcUi} from '../features/calculator.js';
import {handleCommand} from './commandHandler.js';
import {homeMenu,helpMenu} from './mainUI.js';

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
            homeMenuGetter: homeMenu,
            helpMenu,
            calcUi
        });

        inputField.value = '';
    }
});

writeToConsole(homeMenuGetter());
