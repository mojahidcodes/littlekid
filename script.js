const board = Array(9).fill(null);
let currentPlayer = 'X';
let gameActive = true;

const WINNING_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

const statusEl = document.getElementById('status');
const cellEls = document.querySelectorAll('.cell');
const restartBtn = document.getElementById('restart');

function updateStatus() {
  const result = checkResult();
  if (result && result.winner) {
    statusEl.textContent = `${result.winner} wins!`;
  } else if (result && result.draw) {
    statusEl.textContent = 'Draw!';
  } else {
    statusEl.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkResult() {
  for (const line of WINNING_LINES) {
    const [a, b, c] = line;
    if (board[a] !== null && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line: line };
    }
  }
  if (board.every(cell => cell !== null)) {
    return { winner: null, draw: true };
  }
  return null;
}

function handleCellClick(index) {
  if (!gameActive || board[index] !== null) return;

  board[index] = currentPlayer;
  cellEls[index].textContent = currentPlayer;
  cellEls[index].classList.add(currentPlayer === 'X' ? 'x' : 'o');

  const result = checkResult();
  if (result) {
    if (result.winner) {
      result.line.forEach(i => cellEls[i].classList.add('winning'));
      gameActive = false;
    } else if (result.draw) {
      gameActive = false;
    }
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
  updateStatus();
}

function restartGame() {
  for (let i = 0; i < 9; i++) {
    board[i] = null;
    cellEls[i].textContent = '';
    cellEls[i].classList.remove('x', 'o', 'winning');
  }
  currentPlayer = 'X';
  gameActive = true;
  updateStatus();
}

cellEls.forEach((cell, index) => {
  cell.addEventListener('click', () => handleCellClick(index));
});

restartBtn.addEventListener('click', restartGame);

updateStatus();
