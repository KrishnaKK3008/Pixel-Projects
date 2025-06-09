const boxes = document.querySelectorAll('.box');
const resultDisplay = document.getElementById('result');
const resetButton = document.getElementById('reset-button');

let count = 0;
let gameOver = false;
const board = Array(9).fill(null);

// Updated icon URLs
const circleURL = "circle.png";
const crossURL = "https://img.icons8.com/ios-filled/100/FF0000/multiply.png";

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6]             // diagonals
];

function checkWinner() {
  for (let combo of winningCombinations) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      gameOver = true;
      resultDisplay.textContent = `${board[a]} Wins!`;
      return;
    }
  }

  if (!board.includes(null)) {
    gameOver = true;
    resultDisplay.textContent = "It's a Draw!";
  }
}

boxes.forEach((box, index) => {
  box.addEventListener('click', () => {
    if (box.style.backgroundImage || gameOver) return;

    if (count % 2 === 0) {
      box.style.backgroundImage = `url('${circleURL}')`;
      board[index] = 'O';
    } else {
      box.style.backgroundImage = `url('${crossURL}')`;
      board[index] = 'X';
    }

    count++;
    checkWinner();
  });
});

resetButton.addEventListener('click', () => {
  boxes.forEach((box) => {
    box.style.backgroundImage = '';
  });
  board.fill(null);
  count = 0;
  gameOver = false;
  resultDisplay.textContent = '';
});
