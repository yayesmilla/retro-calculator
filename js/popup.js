/**
 * @author Yaye Esmilla
 * https://github.com/yayesmilla
 */
import { keys, operandsMap } from './configs.js';

let CURRENT = null;
let OPERAND = null;
let KEYS = [];

function buildElements() {

    let $row, $keyButton;

    return new Promise((resolve, reject) => {

        keys.forEach(values => {

            $row = document.createElement('div');
            $row.classList.add('row');
            values.forEach(keyButton => {

                $keyButton = document.createElement('button');
                $keyButton.setAttribute('id', keyButton.id);
                $keyButton.setAttribute('type', 'button');
                $keyButton.classList.add('btn', 'btnKey');

                if (keyButton.class) {

                    $keyButton.classList.add(keyButton.class);

                    if (keyButton.class === 'operand') {
                        $keyButton.setAttribute('data-operand', keyButton.operand);
                    } else if (keyButton.class === 'number') {
                        $keyButton.setAttribute('value', parseInt(keyButton.text));
                    }
                }

                $keyButton.innerHTML = keyButton.text;

                $row.append($keyButton);

            });
            document.getElementById('keyButtonsContainer').append($row);
        });

        resolve();
    });
}

function bindEventListeners() {

    return new Promise((resolve, reject) => {

        const $numberKeys = document.querySelectorAll('.btnKey.number');
        const $operandKeys = document.querySelectorAll('.btnKey.operand');

        $numberKeys.forEach($numKey => {
            $numKey.addEventListener('click', (e) => {
                clickNumber(e.target.value);

            });
        });

        $operandKeys.forEach($btn => {
            $btn.addEventListener('click', (e) => {
                clickOperand(e.target.getAttribute('data-operand'));

            });
        });

        document.getElementById('keyClear').addEventListener('click', (e) => {
            clickClearKey();
        });


        document.getElementById('keyEquals').addEventListener('click', (e) => {
            compute();
        });

        document.getElementById('keyDecimal').addEventListener('click', (e) => {
            clickDecimal();
        });

        document.getElementById('keyAbsolute').addEventListener('click', (e) => {
            clickAbsolute();
        });

        document.getElementById('keyPercent').addEventListener('click', (e) => {
            clickPercent();
        });

        document.addEventListener('keydown', e => {

            const code = e.code.toLowerCase();
            const operandCode = e.shiftKey ? 'shift' + code : code;
            let value;

            if (typeof operandsMap[operandCode] !== 'undefined') {
                document.getElementById(operandsMap[operandCode].elementId).focus();
                clickOperand(operandsMap[operandCode].operand);

            } else {

                switch (operandCode) {
                    case 'shiftdigit5':
                        document.getElementById('keyPercent').focus();
                        clickPercent();
                        break;
                    case 'period':
                        document.getElementById('keyDecimal').focus();
                        clickDecimal();
                        break;
                    case 'equal':
                    case 'enter':
                        document.getElementById('keyEquals').focus();
                        compute();
                        break;
                    case 'keyc':
                    case 'backspace':
                        document.getElementById('keyClear').focus();
                        clickClearKey();
                        break;
                    default:
                        if (code.indexOf('digit') === 0) {
                            value = code.replace('digit', '');
                            document.getElementById('key' + value).focus();
                            clickNumber(value);
                        }
                }
            }

        });
        resolve();
    });
}

function clickNumber(value) {

    const keys = getKeys();

    if (keys.length <= 12) {
        addToKeys(value);
        displayOnScreen(getKeysValue());
    }
}

function clickDecimal() {
    const hasDecimal = getKeys().includes('.');
    const isFirstValue = getKeys().length === 0;

    if (!hasDecimal) {

        if (isFirstValue) {
            addToKeys(0);
        }

        addToKeys('.');
        displayOnScreen(getKeysValue());
    }
}

function clickPercent() {

    const keys = getKeysValue();
    const keyValue = getKeysValue();
    const currentValue = getCurrentValue();
    const useKeysValue = keys.length !== 0;

    let value = useKeysValue ? keyValue : currentValue;

    value = value / 100;

    if (useKeysValue) {
        resetKeys();
        KEYS = value.toString().split('');
    } else {
        setCurrentValue(value);
    }

    displayOnScreen(value);
}

function clickClearKey() {
    setCurrentValue(null);
    displayOnScreen(0);
}

function clickOperand(operand) {

    const currentValue = getCurrentValue();
    let value = parseFloat(getKeysValue());

    if (Number.isNaN(value)) {
        value = 0;
    }

    if (currentValue === null) {
        setCurrentValue(value);
    } else {
        compute();
    }

    setCurrentOperand(operand);
}

function clickAbsolute() {

    let keys = getKeys();
    let keyValue = getKeysValue();
    let currentValue = getCurrentValue();
    let useKeysValue = keys.length !== 0;

    value = useKeysValue ? keyValue : currentValue;

    if (value < 0) {
        value = Math.abs(value);
        if (useKeysValue && KEYS[0] === '-') {
            KEYS.shift();
        }

    } else if (value > 0) {

        value = value * -1;

        if (useKeysValue) {
            KEYS.unshift('-');
        }

    } else {
        value = 0;
    }

    if (!useKeysValue) {
        setCurrentValue(value);
    }

    displayOnScreen(value);
}


function displayOnScreen(value) {

    const isFloat = Number(value) === value && value % 1 !== 0;
    if (isFloat) {
        value = parseFloat(value.toFixed(10));
    }

    document.getElementById('screenBody').innerHTML = value;
}

function compute() {

    let total = 0;

    let currentOperand = getCurrentOperand();
    let currentValue = getCurrentValue();
    let keysValue = parseFloat(getKeysValue());

    if (!Number.isNaN(keysValue)) {

        switch(currentOperand) {
            case '+':
                total = currentValue + keysValue;
                break;
            case '-':
                total = currentValue - keysValue;
                break;
            case '/':
                total = currentValue / keysValue;
                break;
            case '*':
                total = currentValue * keysValue;
                break;
        }

        if (total.toString().length > 12) {
            displayOnScreen(total.toExponential(5));
        } else {
            displayOnScreen(total);
        }

        setCurrentValue(total);
    }
}

function addToKeys(value) {
    KEYS.push(value);
}

function getKeys() {
    return KEYS;
}

function resetKeys() {
    KEYS = [];
}

function setCurrentOperand(operand) {
    OPERAND = operand;
}

function getCurrentOperand() {
    return OPERAND;
}

function setCurrentValue(value) {
    CURRENT = value;
    resetKeys();
}

function getCurrentValue() {
    return CURRENT === null ? null : parseFloat(CURRENT);
}

function getKeysValue() {
    return KEYS.join('');
}

document.addEventListener('DOMContentLoaded', () => {

    buildElements()
        .then(bindEventListeners);
});
