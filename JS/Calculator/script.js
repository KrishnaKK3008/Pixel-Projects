const display = document.getElementById('display');
const buttons = document.querySelectorAll('.buttons button');

let expression = '';

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    if (!isNaN(value) || value === '.') {
      expression += value;
      display.value = expression;
    } else if (['+', '-', '×', '÷', '%'].includes(value)) {
      if (expression === '') return;
      const lastChar = expression[expression.length - 1];
      if (['+', '-', '*', '/', '%'].includes(lastChar)) return;

      expression += convertOperator(value);
      display.value = expression;
    } else if (value === '=') {
      try {
        const sanitized = expression.replace(/×/g, '*').replace(/÷/g, '/');
        const result = eval(sanitized);
        display.value = result;
        expression = result.toString();
      } catch {
        display.value = 'Error';
        expression = '';
      }
    } else if (value === 'C') {
      expression = '';
      display.value = '0';
    } else if (value === 'Del') {
      expression = expression.slice(0, -1);
      display.value = expression || '0';
    } else if (value === 'Exp') {
      try {
        const expVal = Math.exp(parseFloat(expression));
        expression = expVal.toString();
        display.value = expression;
      } catch {
        display.value = 'Error';
        expression = '';
      }
    }
  });
});

function convertOperator(op) {
  switch (op) {
    case '+': return '+';
    case '-': return '-';
    case '×': return '*';
    case '÷': return '/';
    case '%': return '%';
  }
}
