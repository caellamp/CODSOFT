const display = document.getElementById('display');
let currentInput = '';
let operator = null;
let previousInput = null;

const buttons = document.querySelectorAll('button');

buttons.forEach(function(button) {
  button.addEventListener('click', function() {
    handleButtonClick(button.textContent); 
  });
});

document.addEventListener('keydown', function(event) {
  const key = event.key;
  const keyMap = {
    '0': '0', 
    '1': '1',
    '2': '2',
    '3': '3',
    '4': '4',
    '5': '5',
    '6': '6',
    '7': '7',
    '8': '8',
    '9': '9',
    '.': '.',
    '+': '+',
    '-': '-',
    '*': '*',
    '/': '/',
    'Enter': '=',
    'c': 'C', 
    'C': 'C' 
  };

  if (keyMap[key]) {
    handleButtonClick(keyMap[key]); 
  }
});

function handleButtonClick(buttonValue) {
  if (buttonValue >= '0' && buttonValue <= '9') { 
    currentInput += buttonValue; 
  } else if (buttonValue === '.') {
    if (!currentInput.includes('.')) {
      currentInput += '.';
    }
  } else if (buttonValue === '+' || buttonValue === '-' || buttonValue === '*' || buttonValue === '/') {
    if (previousInput !== null && operator) { 
      currentInput = evaluate(previousInput, operator, currentInput); 
    }
    operator = buttonValue;
    previousInput = currentInput; 
    currentInput = ''; 
  } else if (buttonValue === '=') {
    if (previousInput !== null && operator) {
      currentInput = evaluate(previousInput, operator, currentInput);
    }
    operator = null; 
    previousInput = null; 
  } else if (buttonValue === 'C') {
    currentInput = '';
    previousInput = null;
    operator = null;
  }

  display.textContent = currentInput;
}

function evaluate(num1, operator, num2) {
  num1 = parseFloat(num1);
  num2 = parseFloat(num2);

  switch (operator) {
    case '+':
      return (num1 + num2).toString();
    case '-':
      return (num1 - num2).toString();
    case '*':
      return (num1 * num2).toString();
    case '/':
      if (num2 === 0) {
        return 'Error';
      } else {
        return (num1 / num2).toString();
      }
    default:
      return 'Error';
  }
}