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

let decimals = 5;
function roundTo(num) {
  return Math.round(num * 10 ** decimals) / 10 ** decimals;
}

function operate(operator, a, b) {
    if (operator === '/' && b === '0') return displayOutput.textContent = 'Ar U ReTard?';
    switch(operator) {
        case '+': return displayOutput.textContent = roundTo(add(a, b));
        case '-': return displayOutput.textContent = roundTo(subtract(a, b));
        case '*': return displayOutput.textContent = roundTo(multiply(a, b));
        case '/': return displayOutput.textContent = roundTo(divide(a, b));
        case '%': return displayOutput.textContent = roundTo(modulo(a, b));
        default: return 0;
    }
}

function populateDisplay(num) {
    if (result) clear();
    if (operatorCount > 1) {
        numA = displayOutput.textContent;
        clear();
    }
    result = false;
    return displayOutput.textContent += num;
}

// clears display
function clear() {
    return displayOutput.textContent = "";
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
    // console.clear();
}

// deletes latest character
function deleteChar() {
    displayOutput.textContent = displayOutput.textContent.slice(0, -1);
}

document.querySelector(".btn-clear").addEventListener('click', () => clearAllValues());
document.querySelector(".btn-delete").addEventListener('click', () => deleteChar());

document.querySelector(".btn-decimal").addEventListener('click', () => {
    if (displayOutput.textContent.includes('.')) return; // Early return
    populateDisplay('.');
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

// Operator logic
function handleOperator(operator) {
    if (displayOutput.textContent === '' || lastAction === 'operator') {
        currentOperator = operator;
        console.log(`Changed operator to: ${operator}`);
        return;
    }

    operatorCount++;
    lastAction = 'operator';
    console.log(operatorCount + ' Operator Count');

    if (operatorCount > 1) {
        numB = displayOutput.textContent;
        console.log(currentOperator);
        operate(currentOperator, numA, numB);
        currentOperator = operator;
    } else if (operatorCount === 1) {
        numA = displayOutput.textContent;
        console.log(numA + ' numA log');
        console.log(operator); 
        currentOperator = operator;
        clear();
    }
}

document.querySelector(".btn-equals").addEventListener('click', () => {
    handleEquals();
});

// Equals logic
function handleEquals() {
    numB = displayOutput.textContent;
    console.log(numB + " numB log");
    console.log(operate(currentOperator, numA, numB));
    numA = 0;
    operatorCount = 0;
    currentOperator = '';
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
            event.preventDefault(); // Stop the default behavior
            deleteChar();
            break;
            
        case '.':
            event.preventDefault();
            if (displayOutput.textContent.includes('.')) return; // Early return
            populateDisplay('.');
            break;
    }
});


/*
TO DO:
    - Add History above
    - Add visual feedback for key presses
    - Clean up console.log statements
*/





