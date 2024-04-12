
/*
    User guide:
    CA: Clear All, clears all entries and operations, essentially it resets the calculator.
    CK: Clear Key, clear the last entry or the last digit entered on the display.
    RC: Used to recall a stored value from memory.
*/


const numButtons = document.querySelectorAll('.button-num');
const functionButtons = document.querySelectorAll('.button-function');
const calcScreen = document.querySelector('#calc-screen');

let firstInput = true;
let expression = '';

let mem = {
    operand: [],
    history: [],
}

/* 
    the expression is stored in 'expression', when the user presses '='
    the string is split into 'operand' using a regex that catches the symbols /+*-/n/,
    using an if we call the operator function depending on which regex gets triggered. 
    we could use a recurring function to check if the string contains each symbol. if it does,
    it calculates the operation between the two closest operands and then call itself to continue
    checking for symbol ocurrances.
*/

functionButtons.forEach(el => {
    el.addEventListener('click', (event) => {
        console.log(event.target.id);
        switch (event.target.id) {
            case 'clear-all-btn':
                if (calcScreen.textContent === '0') break;
                clearAll();
                break;
            case 'clear-key-btn':
                if (calcScreen.textContent === '0') break;
                clearKey();
                break;
            case 'mult-btn':
                break;
            case 'result-btn':
                break;
            default:
                refreshScreen('0');
        }
    })
});

numButtons.forEach(el => {
    el.addEventListener('click', (event) => {
        if (firstInput) calcScreen.textContent = '';
        firstInput = false;
        expression += event.target.value;
        refreshScreen(expression);
    })
});

const clearKey = () => {
    calcScreen.textContent = calcScreen.textContent.slice(0, -1);
    expression = expression.slice(0, -1);
    firstInput = true;
}
const multiply = (operand1, operand2) => {
    return operand1 * operand2;
}
const refreshScreen = (contentToDisplay) => { /* Implement a way to always display 0*/
    calcScreen.textContent = contentToDisplay;
}
const clearAll = () => {
    firstInput = true;
    expression = '';
    mem.history = [];
    mem.operand = [];
    calcScreen.textContent = '0';
};
