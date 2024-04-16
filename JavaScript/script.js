
/*
    User guide:
    CA: Clear All, clears all entries and operations, essentially it resets the calculator but keeps the history of results.
    CK: Clear Key, clear the last entry or the last digit entered on the display.
    RC: Used to recall a result value from memory.
    **Missing but due for future update:
    K switch: Allows the constant function to be toggled; used to store a number temporarily in memory
              for repetitive calculations.
*/


const numButtons = document.querySelectorAll('.button-num');
const functionButtons = document.querySelectorAll('.button-function');
const calcScreen = document.querySelector('#calc-screen');

let inputValue = 0;
let expression = [];
let memory = [0];
let isNegative = false;
let secondPass = false; //This is toggled once the user presses a function button to trigger the function calling.
let thirdPass = false; /*This is toggled when an operation has been processed and the user inputs a number
                        to reset the calculator screen and inputValue back to 0 ready for the next operand.*/
let functionType = '';
let lastButtonPressed = '';


numButtons.forEach(element => {
    element.addEventListener('click', event => {
        if (thirdPass) {
            refreshScreen(0);
            inputValue = 0;
            thirdPass = false;
        }
        if (event.target.id === 'dot-btn' && inputValue.toString().includes('.')) {
            return;
        }
        inputValue += event.target.value;
        refreshScreen(inputValue);
        lastButtonPressed = '';
    });
});

/* TODO: Control that the user cannot press two function buttons in  sequence */

functionButtons.forEach(element => {
    element.addEventListener('click', event => {
        let buttonPressed = event.target.id;
        if (buttonPressed === lastButtonPressed) {
            console.log('Already Pressed: '+buttonPressed);
            return;
        }
        switch (buttonPressed) {
            case 'clear-all-btn':
                clearAll();
                break;
            case 'clear-key-btn':
                thirdPass = false;
                clearKey();
                break;
            case 'recall-btn':
                thirdPass = false;
                if (memory.length === 1) {
                    memory = [0];
                    break;
                }
                inputValue = memory.splice(-2, 1); //Gets the second to last and deletes the last.
                refreshScreen(inputValue);
                break;
            case 'mult-btn':
                lastButtonPressed = buttonPressed;
                if (secondPass) {
                    expression.push(inputValue);
                    computeExpression(functionType, expression);
                    refreshScreen(inputValue);
                    expression = [];
                    secondPass = false;
                    thirdPass = true;
                    break;
                };
                expression.push(inputValue);
                inputValue = 0;
                secondPass = true;
                functionType = 'multiplication';
                refreshScreen(0);
                calcScreen.textContent = '*';
                break;
            case 'div-btn':
                lastButtonPressed = buttonPressed;
                if (secondPass) {
                    expression.push(inputValue);
                    computeExpression(functionType, expression);
                    refreshScreen(inputValue);
                    expression = [];
                    secondPass = false;
                    thirdPass = true;
                    break;
                };
                expression.push(inputValue);
                inputValue = 0;
                secondPass = true;
                functionType = 'division';
                refreshScreen(0);
                calcScreen.textContent = '÷';
                break;
            case 'subs-rslt-btn':
                lastButtonPressed = buttonPressed;
                if (secondPass) {
                    expression.push(inputValue);
                    computeExpression(functionType, expression);
                    refreshScreen(inputValue);
                    expression = [];
                    secondPass = false;
                    thirdPass = true;
                    isNegative = false;
                    break;
                };
                expression.push(inputValue);
                inputValue = 0;
                secondPass = true;
                functionType = 'subtraction';
                refreshScreen(0);
                calcScreen.textContent = '-';
                break;
            case 'add-rslt-btn':
                lastButtonPressed = buttonPressed;
                if (secondPass) {
                    expression.push(inputValue);
                    computeExpression(functionType, expression);
                    refreshScreen(inputValue);
                    expression = [];
                    secondPass = false;
                    thirdPass = true;
                    break;
                };
                expression.push(inputValue);
                inputValue = 0;
                secondPass = true;
                functionType = 'addition';
                refreshScreen(0);
                calcScreen.textContent = '+';
                break;
        }
    });
});



// Function to toggle the sign of the current number

// **********************  FUNCTIONS REALM **********************

const computeExpression = (expressionType, expressionArray) => {
    lastButtonPressed = ''
    switch (expressionType) {
        case 'multiplication':
            multiply(expressionArray);
            break;
        case 'division':
            divide(expressionArray);
            break;
        case 'subtraction':
            subtract(expressionArray);
            break;
        case 'addition':
            add(expressionArray);
            break;
    }
}
//I'm using an array so that in the future the calculator can be upgraded to hadle more than two operands and expression evaluation.
const multiply = (expression) => {
    inputValue = expression.reduce((acc, el) => parseFloat(acc) * parseFloat(el), 1);
    console.log("Multiplication result: " + inputValue);
    memory.push(inputValue);
}

const divide = (expression) => {
    inputValue = expression.reduce((acc, el) => parseFloat(acc) / parseFloat(el));
    console.log("Division result: " + inputValue);
    memory.push(inputValue);
}

const subtract = (expression) => {
    inputValue = expression.reduce((acc, el) => parseFloat(acc) - parseFloat(el));
    console.log("Subtraction result: " + inputValue);
    memory.push(inputValue);
}

const add = (expression) => {
    inputValue = expression.reduce((acc, el) => parseFloat(acc) + parseFloat(el), 0);
    console.log("Addition result: " + inputValue);
    memory.push(inputValue);
}

const refreshScreen = (content) => {
    if (!content) content = 0;
    const formattedNumber = parseFloat(content).toFixed(2);
    if (formattedNumber.length > 8) {
        const truncatedNumber = formattedNumber.slice(0, 8);
        calcScreen.textContent = truncatedNumber;
    } else {
        calcScreen.textContent = formattedNumber;
    }
}

const clearKey = () => {
    let inputValueString = inputValue.toString();
    if (inputValueString.length <= 1) {
        inputValue = 0;
    } else {
        inputValue = parseFloat(inputValueString.slice(0, -1));
    }

    refreshScreen(inputValue); // Refresh the display
}

const negativeValue = () => {
    inputValue *= -1;
    refreshScreen(inputValue);
};

const clearAll = () => {
    refreshScreen('0');
    inputValue = 0;
    expression = [];
    secondPass = false;
    thirdPass = false;
    lastButtonPressed = '';
    return;
}
