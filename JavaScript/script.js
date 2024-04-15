
/*
    User guide:
    CA: Clear All, clears all entries and operations, essentially it resets the calculator but keeps the history.
    CK: Clear Key, clear the last entry or the last digit entered on the display.
    RC: Used to recall a stored value from memory.
*/


const numButtons = document.querySelectorAll('.button-num');
const functionButtons = document.querySelectorAll('.button-function');
const calcScreen = document.querySelector('#calc-screen');

let inputValue = 0;
let expression = [];
let memory = [];
let secondPass = false;
let functionType = '';

numButtons.forEach(element => {
    element.addEventListener('click', event => {
        inputValue += event.target.value;
        refreshScreen(inputValue);
    });
});

functionButtons.forEach(element => {
    element.addEventListener('click', event => {
        let buttonPressed = event.target.id;
        switch (buttonPressed) {
            case 'clear-all-btn': 
                clearAll();
                break;
            case 'clear-key-btn':
                clearKey();
                break;
            case 'mult-btn':
                if (secondPass) {
                    expression.push(inputValue);
                    computeExpression(functionType, expression);
                    refreshScreen(inputValue);
                    expression = [];
                    secondPass = false;
                    break;
                };
                expression.push(inputValue);
                inputValue = 0;
                secondPass = true;
                functionType = 'multiplication';
                refreshScreen(0);
                break;
            case 'div-btn': 
            if (secondPass) {
                expression.push(inputValue);
                computeExpression(functionType, expression);
                refreshScreen(inputValue);
                expression = [];
                secondPass = false;
                break;
            };
            expression.push(inputValue);
            inputValue = 0;
            secondPass = true;
            functionType = 'division';
            break;
            case 'subs-rslt-btn':
                if (secondPass) {
                    expression.push(inputValue);
                    computeExpression(functionType, expression);
                    refreshScreen(inputValue);
                    expression = [];
                    secondPass = false;
                    break;
                };
                expression.push(inputValue);
                inputValue = 0;
                secondPass = true;
                functionType = 'subtraction';
                break;
            case 'add-rslt-btn':
                if (secondPass) {
                    expression.push(inputValue);
                    computeExpression(functionType, expression);
                    refreshScreen(inputValue);
                    expression = [];
                    secondPass = false;
                    break;
                };
                expression.push(inputValue);
                inputValue = 0;
                secondPass = true;
                functionType = 'addition';
                break;
            case 'recall-btn':
                inputValue = memory.pop();
                refreshScreen(inputValue);
                
        }
    });
});

// **********************  FUNCTIONS REALM **********************

const computeExpression = (expressionType, expressionArray) => {
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

const multiply = (expression) => {
    inputValue = expression.reduce((acc, el) => parseFloat(acc) * parseFloat(el), 1);
    console.log("Multiplication result: "+inputValue);
    memory.push(inputValue.toFixed(2));
}
const divide = (expression) => {
    inputValue = expression.reduce((acc, el) => parseFloat(acc) / parseFloat(el));
    console.log("Division result: "+inputValue);
    memory.push(inputValue.toFixed(2));
}
const subtract = (expression) => {
    inputValue = expression.reduce((acc, el) => parseFloat(acc) - parseFloat(el));
    console.log("Subtraction result: "+inputValue);
    memory.push(inputValue.toFixed(2));
}
const add = (expression) => {
    inputValue = expression.reduce((acc, el) => parseFloat(acc) + parseFloat(el), 0);
    console.log("Addition result: "+inputValue);
    memory.push(inputValue.toFixed(2));
}


const refreshScreen = (content) => {
    if (!content) content = 0;
    else if (parseFloat(content).toFixed(2).toString().length > 8) {
        clearAll();
        calcScreen.textContent = 'MAX LENGTH';
        return;
    } 
    calcScreen.textContent = parseFloat(content).toFixed(2);
}

const clearKey = () => {
    inputValue = inputValue.toString();
    inputValue = inputValue.slice(0, -1);
    inputValue = parseFloat(inputValue);
    refreshScreen(inputValue);
    return;
}

const clearAll = () => {
    refreshScreen('0');
    inputValue = 0;
    expression = [];
    secondPass = false;
    return;
}
