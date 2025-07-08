//Calculator

const add = (a, b) => Number(a) + Number(b);
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
const modulo = (a, b) => a % b;

let numA = 0;
let numB = 0;
let result = false;
let operatorCount = 0;
let currentOperator = '';
let lastAction = 'number'; 

const displayOutput = document.querySelector(".display-output");
const displayHistory = document.querySelector(".display-history");

const getCurrentDisplay = () => displayOutput.textContent;
const setDisplay = (value) => displayOutput.textContent = value;
const appendToDisplay = (value) => displayOutput.textContent += value;

const decimals = 5;
function roundTo(num) {
  return Math.round(num * 10 ** decimals) / 10 ** decimals;
}

function operate(operator, a, b) {
    if (operator === '/' && b === '0') return setDisplay('Ar U ReTard?');
    switch(operator) {
        case '+': return setDisplay(roundTo(add(a, b)));
        case '-': return setDisplay(roundTo(subtract(a, b)));
        case '*': return setDisplay(roundTo(multiply(a, b)));
        case '/': return setDisplay(roundTo(divide(a, b)));
        case '%': return setDisplay(roundTo(modulo(a, b)));
        default: return 0;
    }
}

function populateHistory(operator, num) {
    if (num.includes('.') && num.indexOf('.') === num.length - 1) {
        num = num.slice(0, -1);
    }
    displayHistory.textContent = `${num} ${operator}`;
}

function populateDisplay(num) {
    if (num === '0' && getCurrentDisplay() === '') {
        return appendToDisplay(num);    // Early return
    } else if (num === '0' && getCurrentDisplay() === '0') {
        return;                         // Early return
    }

    if (result) clear();
    if (operatorCount > 1 && lastAction === 'operator') {
        numA = getCurrentDisplay();
        clear();
    }

    const maxDigits = 11;
    
    // Count only digits (exclude decimal point and negative sign)
    const digitCount = getCurrentDisplay().replace(/[\.\-]/g, '').length;
    
    // Allow decimal point even if at digit limit
    if (digitCount >= maxDigits && num !== '.') return;         // Don't add more digits
    else if (digitCount === maxDigits && num === '.') return;   // Don't add '.' if at MAX digits

    result = false;
    if (num === '.' && lastAction === 'operator') {
        clear();
        return appendToDisplay(`0${num}`);
    }
    if (num === '.'&& getCurrentDisplay() === '') {
        return appendToDisplay(`0${num}`);
    }

    return appendToDisplay(num);
}

// clears display
function clear() {
    return setDisplay('');
}

// Resets to "Default" values
function clearAllValues() {
    numA = 0;
    numB = 0;
    result = false;
    operatorCount = 0;
    currentOperator = '';
    lastAction = 'number';
    clear();
    displayHistory.textContent = '';
}

// deletes latest character
function deleteChar() {
    setDisplay(getCurrentDisplay().slice(0, -1));
}

// CLEAR , DELETE , DECIMAL --------------------------------------------------------
document.querySelector(".btn-clear").addEventListener('click', () => clearAllValues());
document.querySelector(".btn-delete").addEventListener('click', () => deleteChar());
document.querySelector(".btn-decimal").addEventListener('click', () => {
    if (getCurrentDisplay().includes('.')) return; // Early return
    populateDisplay('.');
    lastAction = 'number';
});

// Get all NUMBER buttons and add event listeners
document.querySelectorAll('.btn-number').forEach(button => {
    button.addEventListener('click', () => {
        const number = button.textContent;
        populateDisplay(number);
        lastAction = 'number';
    });
});

// Get all OPERATOR buttons and add event listeners
document.querySelectorAll('.btn-operator').forEach(button => {
    button.addEventListener('click', () => {
        const operator = button.textContent;
        handleOperator(operator);
    });
});

// Operator logic - this function is retarded, if there is a bug it's for sure here
function handleOperator(operator) {
    if (getCurrentDisplay() === '' || lastAction === 'operator') {
        currentOperator = operator;
        if (operatorCount > 1) return populateHistory(currentOperator, getCurrentDisplay());
        populateHistory(currentOperator, numA);
        return;
    }

    operatorCount++;
    lastAction = 'operator';

    if (operatorCount > 1) {
        numB = getCurrentDisplay();
        operate(currentOperator, numA, numB);
        currentOperator = operator;
        populateHistory(currentOperator, getCurrentDisplay());
    } else if (operatorCount === 1) {
        numA = getCurrentDisplay();
        currentOperator = operator;
        populateHistory(currentOperator, numA);
        clear();
    }
}

// ===========EQUALS============
document.querySelector(".btn-equals").addEventListener('click', () => {
    if (lastAction === 'operator' && getCurrentDisplay() === '') return;
    handleEquals();
});

// Equals logic - this is also retarded
function handleEquals() {
    if (lastAction === 'equals') return;    // Early exit
    if (currentOperator === '') return;     // Early exit

    if (lastAction === 'operator') {
        numA = getCurrentDisplay();
    } 

    numB = getCurrentDisplay();
    operate(currentOperator, numA, numB);

    numA = numA.toString();
    numB = numB.toString();
    
    // Slice off the decimal if there is no number after
    if (numA.includes('.') && numA.indexOf('.') === numA.length - 1) {
        numA = numA.slice(0, -1);
    }
    if (numB.includes('.') && numB.indexOf('.') === numB.length - 1) {
        numB = numB.slice(0, -1);
    }

    displayHistory.textContent = `${numA} ${currentOperator} ${numB} =`;
    numA = 0;
    operatorCount = 0;
    currentOperator = '';
    lastAction = 'equals'
    result = true;
}

// Keyboard support
document.addEventListener('keydown', (event) => {
    const key = event.key;
    
    // Numbers 0-9
    if (key >= '0' && key <= '9') {
        populateDisplay(key);
        lastAction = 'number';
        return;
    }
    
    // Operators
    switch(key) {
        case '+':
        case '-':
        case '*':
        case '/':
        case '%':
            event.preventDefault();
            handleOperator(key);
            break;
            
        case 'Enter':
        case '=':
            event.preventDefault();
            handleEquals();
            break;
            
        case 'Escape':
        case 'c':
        case 'C':
            event.preventDefault();
            clearAllValues();
            break;
            
        case 'Backspace':
        case 'Delete':
            event.preventDefault();
            deleteChar();
            break;
            
        case '.':
            event.preventDefault();
            if (getCurrentDisplay().includes('.')) return; // Early return
            populateDisplay('.');
            break;
    }
});


/*
TO DO:
    - Add proper handling of negative numbers
    - Add visual feedback for key presses on keyboard
*/




