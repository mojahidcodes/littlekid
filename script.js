document.addEventListener('DOMContentLoaded', () => {
  // Game state
  const board = Array(9).fill('');
  let currentPlayer = 'X';
  let gameActive = true;
  let winningLine = [];

  // All 8 winning combinations (rows, columns, diagonals)
  const WIN_COMBOS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  // DOM lookups
  const boardEl = document.getElementById('board');
  const statusEl = document.getElementById('status');
  const restartBtn = document.getElementById('restart');
  const cellEls = document.querySelectorAll('.cell');

  // Render the current board state to the DOM, toggling the .win class
  function render() {
    cellEls.forEach((cell, i) => {
      cell.textContent = board[i];
      if (winningLine.includes(i)) {
        cell.classList.add('win');
      } else {
        cell.classList.remove('win');
      }
    });
  }

  // Check for a win or draw after each move
  function checkResult() {
    for (const combo of WIN_COMBOS) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        winningLine = combo;
        gameActive = false;
        statusEl.textContent = `Player ${currentPlayer} wins!`;
        render();
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

  // Click handler for each cell
  cellEls.forEach((cell) => {
    const idx = parseInt(cell.dataset.index, 10);
    cell.addEventListener('click', () => {
      if (!gameActive || board[idx] !== '') return;
      board[idx] = currentPlayer;
      checkResult();
    });
  });

  // Restart / new game handler
  restartBtn.addEventListener('click', () => {
    for (let i = 0; i < board.length; i++) {
      board[i] = '';
    }
    currentPlayer = 'X';
    gameActive = true;
    winningLine = [];
    statusEl.textContent = "Player X's turn";
    render();
  });

  // Initial render
  statusEl.textContent = "Player X's turn";
  render();
});
