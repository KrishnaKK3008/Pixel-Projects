const display = document.getElementById('display');
const buttons = document.querySelectorAll('.buttons button');

let currentInput = '';
let operator = null;
let previousValue = null;

buttons.forEach(button => {
    button.addEventListener('click', function() {
        const value = this.textContent;

        if (!isNaN(value) || value === '.') {
            currentInput += value;
            display.value = currentInput;
        } else if (['+', '-', '×', '÷', '%'].includes(value)) {
            if (currentInput === '' && previousValue === null) return;

            if (previousValue !== null) {
                calculate();
            }
            previousValue = parseFloat(display.value);
            operator = value;
            currentInput = '';
        } else if (value === '=') {
            if (previousValue !== null && operator !== null) {
                calculate();
                operator = null;
                previousValue = null;
            }
        } else if (value === 'C') {
            currentInput = '';
            operator = null;
            previousValue = null;
            display.value = '0';
        } else if (value === 'Del') {
            currentInput = currentInput.slice(0, -1);
            display.value = currentInput === '' ? '0' : currentInput;
        } else if (value === 'Exp') {
            if (currentInput !== '') {
                currentInput = Math.exp(parseFloat(currentInput)).toString();
                display.value = currentInput;
            }
        }
        
    });
});

function calculate() {
    let result;
    const currentValue = parseFloat(currentInput);

    if (isNaN(currentValue) || isNaN(previousValue)) return;

    switch (operator) {
        case '+':
            result = previousValue + currentValue;
            break;
        case '-':
            result = previousValue - currentValue;
            break;
        case '×':
            result = previousValue * currentValue;
            break;
        case '÷':
            if (currentValue === 0) {
                result = 'Error';
            } else {
                result = previousValue / currentValue;
            }
            break;
        case '%':
            result = previousValue % currentValue;
            break;
        default:
            return;
    }

    display.value = result;
    currentInput = result.toString();
    previousValue = null;
    operator = null;
}