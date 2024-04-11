const numButtons = document.querySelectorAll('.button-num');
const functionButtons = document.querySelectorAll('.button-function');
const calcScreen = document.querySelector('#calc-screen');

let lastDisplayed = ['']; //This var is to store what was outputted last before changing. So we can recall to its content;

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
        console.log(numButton.target.id);
    })
});

const displayOnScreen = (contentToDisplay) => {
    lastDisplayed.push(contentToDisplay);
    calcScreen.textContent = contentToDisplay;
}
const clearScreen = () => {
    calcScreen.textContent = '0';
};