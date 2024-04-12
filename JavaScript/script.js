
/*
    User guide:
    CA: Clear All, clears all entries and operations, essentially it resets the calculator but keeps the history.
    CK: Clear Key, clear the last entry or the last digit entered on the display.
    RC: Used to recall a stored value from memory.
*/


const numButtons = document.querySelectorAll('.button-num');
const functionButtons = document.querySelectorAll('.button-function');
const calcScreen = document.querySelector('#calc-screen');


let calculate = false;
let firstInput = true;
let expression = '';
let history = [];

/* 
    the expression is stored in 'expression', when the user presses '='
    the string is split into 'operand' using a regex that catches the symbols /+*-/n/,
    using an if we call the operator function depending on which regex gets triggered. 
    we could use a recurring function to check if the string contains each symbol. if it does,
    it calculates the operation between the two closest operands and then call itself to continue
    checking for symbol ocurrances.
    Change in Paradigm: We were thinking of a logic to calculate a whole expression with various operators, but the project asks
    for a calculator that operates within 2 operands, if an operator has already been pressed, we change the boolean value of 
    'calculate' to true, so if another operators is pressed, the current expression is executed.
    .
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
                if (calculate) {
                    computeExpression(expression);
                    break;
                }
                expression += "x";
                refreshScreen(expression);
                calculate = true;
                break;
            case 'div-btn':
                if (calculate) {
                    computeExpression(expression);
                    break;
                }
                expression += "/";
                refreshScreen(expression);
                calculate = true;
                break;
            case 'subs-equal-btn':
                if (calculate) {
                    computeExpression(expression);
                    break;
                }
                expression += "-";
                refreshScreen(expression);
                calculate = true;
                break;
            case 'add-equal-btn':
                if (calculate) {
                    computeExpression(expression);
                    break;
                }
                expression += "+"
                refreshScreen(expression);
                calculate = true;
                break;
            default:
                refreshScreen('0');
        }
    })
});

numButtons.forEach(el => {
    el.addEventListener('click', (event) => {
        if (firstInput) refreshScreen('');
        firstInput = false;
        expression += event.target.value;
        refreshScreen(expression);
    })
});

const computeExpression = (currentExpression) => {
    history.push(currentExpression);
    let operands = [];
    if (currentExpression.includes('x')) {
        operands = currentExpression.split('x')
        expression = operands.reduce((acc, el) => acc * el, 1);
        console.log('Result: '+expression);
        refreshScreen(expression);
        calculate = false;
    }
}


const clearKey = () => {
    expression = expression.toString();
    expression = expression.slice(0, -1);
    if (expression === '') expression = 0;
    refreshScreen(expression);
    firstInput = true;
}

const refreshScreen = (contentToDisplay) => { /* Implement a way to always display 0*/
    calcScreen.textContent = contentToDisplay;
}
const clearAll = () => {
    calculate = false;
    firstInput = true;
    expression = '';
    operands = [];
    calcScreen.textContent = '0';
};
