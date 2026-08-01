const board = Array(9).fill('');
let currentPlayer = 'X';
let gameActive = true;

const WIN_COMBOS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

const cells = document.querySelectorAll('.cell');
const statusEl = document.getElementById('status');
const restartBtn = document.getElementById('restart');

cells.forEach((cell, index) => {
  cell.addEventListener('click', () => {
    if (board[index] !== '' || !gameActive) return;
    board[index] = currentPlayer;
    cell.classList.add(currentPlayer === 'X' ? 'x' : 'o');
    cell.textContent = currentPlayer;
    evaluate();
  });
});

function evaluate() {
  for (const combo of WIN_COMBOS) {
    const [a, b, c] = combo;
    if (board[a] === currentPlayer && board[b] === currentPlayer && board[c] === currentPlayer) {
      cells[a].classList.add('winning');
      cells[b].classList.add('winning');
      cells[c].classList.add('winning');
      gameActive = false;
      statusEl.textContent = `Player ${currentPlayer} wins!`;
      return;
    }
  }
  if (!board.includes('')) {
    gameActive = false;
    statusEl.textContent = "It's a draw!";
    return;
  }
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusEl.textContent = `Player ${currentPlayer}'s turn`;
}

restartBtn.addEventListener('click', () => {
  board.fill('');
  cells.forEach(cell => {
    cell.classList.remove('x', 'o', 'winning');
    cell.textContent = '';
  });
  currentPlayer = 'X';
  gameActive = true;
  statusEl.textContent = "Player X's turn";
});
