import {handleCommand} from './commandHandler.js';
import {homeMenu,helpMenu} from './mainUI.js';
import {calculator,calcUi} from '../features/calculator.js';
import {temperatureConverter,resetTempMode,tcUi} from '../features/temperature_converter.js';

//Console backbone
const consoleDiv = document.getElementById('console');
const inputField = document.getElementById('input');
inputField.focus();
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
            consoleDiv,
            homeMenu: homeMenu(),
            helpMenu,
            calculator,calcUi,
            temperatureConverter,tcUi,resetTempMode
        });

        inputField.value = '';
    }
});

writeToConsole(homeMenu());
