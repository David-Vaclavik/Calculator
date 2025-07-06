//Calc

// console.log("calculator log");

const add = (a, b) => Number(a) + Number(b);
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
const modulo = (a, b) => a % b;

// console.log(modulo(4, 3));

let numA = 0;
let numB = 0;
// let operator = 0;
let result = false;

const displayOutput = document.querySelector(".display-output");


function operate(operator, a, b) {
    if (operator === '/' && b === '0') return displayOutput.textContent = 'Ar U ReTaRd?';
    switch(operator) {
        case '+': return displayOutput.textContent = add(a, b);
        case '-': return displayOutput.textContent = subtract(a, b);
        case '*': return displayOutput.textContent = multiply(a, b);
        case '/': return displayOutput.textContent = divide(a, b);
        case '%': return displayOutput.textContent = modulo(a, b);
        default: return 0;
    }
}

function populateDisplay(num) {
    if (result) clear();
    result = false;
    return displayOutput.textContent += num;
}

// clears display
function clear() {
    return displayOutput.innerHTML = "";
}

// deletes latest character
function deleteChar() {
    displayOutput.innerHTML = displayOutput.innerHTML.slice(0, -1);
}

document.querySelector(".btn-clear").addEventListener('click', () => clear());
document.querySelector(".btn-delete").addEventListener('click', () => deleteChar());


// Get all NUMBER buttons and add event listeners
document.querySelectorAll('.btn-number').forEach(button => {
    button.addEventListener('click', () => {
        const number = button.textContent;
        populateDisplay(number);
    });
});

let currentOperator = '';
// Get all OPERATOR buttons and add event listeners
document.querySelectorAll('.btn-operator').forEach(button => {
    button.addEventListener('click', () => {
        const operator = button.textContent;
        numA = displayOutput.textContent;
        console.log(numA + ' numA log');
        console.log(operator); // WIP-----------------------------Somewhere in this function add multiple use of operator
        currentOperator = operator;
        clear();
        // populateDisplay(number);
    });
});

// numB = displayOutput.textContent;
document.querySelector(".btn-equals").addEventListener('click', () => {
    // operate(currentOperator, numA, numB = displayOutput.textContent);
    numB = displayOutput.textContent;
    console.log(numB + " numB log");
    console.log(operate(currentOperator, numA, numB));
    numA = 0;
    currentOperator = '';
    result = true;
});






/*
// Button callback
function onUserChoice(callback) {
    btnNumberOne.addEventListener("click", () => callback(1));
}

// Calling for callback
onUserChoice((choice) => {
    populateDisplay(choice); 
});
*/





/*
// Buttons selector
const btnNewGrid = document.querySelector(".new-grid");
const btnReset = document.querySelector(".reset");
const btnRainbow = document.querySelector(".rainbow");

// Button callback
function onUserChoice(callback) {
    btnNewGrid.addEventListener("click", () => callback("NewGrid"));
    btnReset.addEventListener("click", () => callback("Reset"));
    btnRainbow.addEventListener("click", () => callback("Rainbow"));
}

// Calling for callback
onUserChoice((choice) => {
    if (choice === "Reset") {
        reset();
    } else if (choice === "NewGrid") {
        newSquares();
    } else if (choice === "Rainbow") {
        rainbowMode = !rainbowMode;
        if (rainbowMode) {
            btnRainbow.classList.add("active");
        } else if (rainbowMode === false) {
            btnRainbow.classList.remove("active");
        }
        // getRainbow();
    }
});
*/














