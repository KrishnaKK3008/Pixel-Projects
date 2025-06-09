const display = document.getElementById('dis');
const clipboardAlert = document.getElementById('clipboard-alert');
const optionsAlert = document.getElementById('options-alert');
const slider = document.getElementById('lengthSlider');
const lengthVal = document.getElementById('lengthValue');
const selected = document.getElementsByClassName('checkbox-group')[0];
const copyButton = document.getElementById('copy');

slider.addEventListener('input', () => {
  lengthVal.textContent = slider.value;
});

function getRandomLetter() {
  const letters = "abcdefghijklmnopqrstuvwxyz";
  return letters[Math.floor(Math.random() * letters.length)];
}

function getRandomSymbol() {
  const symbols = "!@#$%^&*()_+-=[]{}|;:',.<>?";
  return symbols[Math.floor(Math.random() * symbols.length)];
}

function getRandomNumber() {
  return Math.floor(Math.random() * 10).toString();
}

function getMixedCase() {
  const letter = String.fromCharCode(97 + Math.floor(Math.random() * 26));
  return letter;
}

slider.addEventListener('change', () => {
  const len = parseInt(slider.value);
  const selectedArr = Array.from(selected.children);
  const generators = [];

  selectedArr.forEach(child => {
    const checkbox = child.querySelector('input[type="checkbox"]');
    if (checkbox && checkbox.checked) {
      switch (checkbox.name) {
        case 'includeLetters':
          generators.push(getRandomLetter);
          break;
        case 'includeNumbers':
          generators.push(getRandomNumber);
          break;
        case 'includeMixedCase':
          generators.push(getMixedCase);
          break;
        case 'includePunctuation':
          generators.push(getRandomSymbol);
          break;
      }
    }
  });

  if (generators.length === 0) {
    optionsAlert.style.display = 'block';
    display.value = '';
    return;
  }

  optionsAlert.style.display = 'none';

  let password = '';
  for (let i = 0; i < len; i++) {
    const randFunc = generators[Math.floor(Math.random() * generators.length)];
    password += randFunc();
  }
  console.log(password)
  display.value = password;
});

// Copy to clipboard functionality
copyButton.addEventListener('click', () => {
  if (display.value.trim() === "") return;

  navigator.clipboard.writeText(display.value).then(() => {
    clipboardAlert.style.display = 'block';
    setTimeout(() => {
      clipboardAlert.style.display = 'none';
    }, 2000);
  });
});
