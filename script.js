document.addEventListener('DOMContentLoaded', () => {
  const board = Array(9).fill(null);
  let currentPlayer = 'X';
  let gameActive = true;

  const WIN_LINES = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  const cells = document.querySelectorAll('.cell');
  const statusEl = document.getElementById('status');
  const restartBtn = document.getElementById('restart');

  function handleCellClick(e) {
    const cell = e.target;
    const index = Number(cell.dataset.index);

    if (!gameActive || board[index] !== null) return;

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer === 'X' ? 'x' : 'o');

    const winningLine = checkWinner();
    if (winningLine) {
      endGame(`Player ${currentPlayer} wins!`, winningLine);
      return;
    }

    if (checkDraw()) {
      endGame('Draw!', null);
      return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateStatus();
  }

  function checkWinner() {
    for (const line of WIN_LINES) {
      const [a, b, c] = line;
      if (board[a] !== null && board[a] === board[b] && board[a] === board[c]) {
        return line;
      }
    }
    return null;
  }

  function checkDraw() {
    return !board.includes(null);
  }

  function endGame(result, line) {
    gameActive = false;
    if (line) {
      line.forEach(index => cells[index].classList.add('win'));
    }
    statusEl.textContent = result;
  }

  function updateStatus() {
    statusEl.textContent = `Player ${currentPlayer}'s turn`;
  }

  function restartGame() {
    for (let i = 0; i < board.length; i++) {
      board[i] = null;
    }
    cells.forEach(cell => {
      cell.textContent = '';
      cell.classList.remove('x', 'o', 'win');
    });
    currentPlayer = 'X';
    gameActive = true;
    updateStatus();
  }

  cells.forEach(cell => cell.addEventListener('click', handleCellClick));
  restartBtn.addEventListener('click', restartGame);

  updateStatus();
});
