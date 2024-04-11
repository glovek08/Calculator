const numButtons = document.querySelectorAll('.button-num');
const functionButtons = document.querySelectorAll('.button-function');
const calcScreen = document.querySelector('#calc-screen');

let delayLine = {
    delayLineA: [0],
    delayLineB: [0],
    current: 0,
} /* In escence, when the user computes the first digit, it gets stored on delayLineA, second digit
 on delayLineB, when an operation occurs, the output will be stored on current, pressing the clear key btn
 will revert one step back, so it will look like this: 
    current: [delayLineA[-1], delayLineB[-1]].
 clearing all would revert both delayLineA and B to ['0'].

 for example, pressing 1 as the first digit will become:
    delayLine['delayLineA'].push(1);
 then second digit:
    delayLine['delayLineB'].push(5);
 if at any point the user uses the recall button the current line will get reverted to the previous input, e.g.
    -the user has already input 1 + 2 and then uses the recall button before pressing "="
    delayLine.delayLineB.pop();
    -now the current will be delayLineA +
 then when the user computes:
    delayLine.current = function(delayLine.delayLineA.pop(), delayLine.delayLineB.pop());
 */ 

functionButtons.forEach(el => {
    el.addEventListener('click', (functionButton) => {
        console.log(functionButton.target.id);
        switch (functionButton.target.id) {
            case 'clear-all-btn':
                clearScreen();
                break;
            default:
                displayOnScreen('GOOAAAL!!');
        }
    })
});
numButtons.forEach(el => {
    el.addEventListener('click', (numButton) => {
        console.log(numButton.target.textContent);
        displayOnScreen(numButton.target.textContent);
    })
});

const displayOnScreen = (contentToDisplay) => {
    if (calcScreen.textContent === '0') {
        calcScreen.textContent = contentToDisplay;
        return;
    }
    calcScreen.textContent += contentToDisplay;
}
const clearScreen = () => {
    calcScreen.textContent = '0';
};