document.addEventListener('DOMContentLoaded', () => {
    const boardElement = document.getElementById('board');
    const startStopButton = document.getElementById('start-stop-button');
    const clearButton = document.getElementById('clear-button');
    const generationCountElement = document.getElementById('generation-count');
  
    const rows = 30;
    const cols = 50;
    let board = [];
    let intervalId;
    let generations = 0;
  
    function createBoard() {
      boardElement.innerHTML = '';
      for (let row = 0; row < rows; row++) {
        board[row] = [];
        for (let col = 0; col < cols; col++) {
          const cell = document.createElement('div');
          cell.classList.add('cell');
          cell.addEventListener('click', () => toggleCell(row, col));
          boardElement.appendChild(cell);
          board[row][col] = cell;
        }
      }
    }
  
    function randomizeBoard() {
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          if (Math.random() > 0.7) {
            board[row][col].classList.add('alive');
          } else {
            board[row][col].classList.remove('alive');
          }
        }
      }
    }
  
    function toggleCell(row, col) {
      board[row][col].classList.toggle('alive');
    }
  
    function getNeighbors(row, col) {
      const neighbors = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],         [0, 1],
        [1, -1], [1, 0], [1, 1]
      ];
      return neighbors.reduce((count, [dx, dy]) => {
        const x = row + dx;
        const y = col + dy;
        if (x >= 0 && x < rows && y >= 0 && y < cols && board[x][y].classList.contains('alive')) {
          count++;
        }
        return count;
      }, 0);
    }
  
    function updateBoard() {
      const newBoardState = [];
      for (let row = 0; row < rows; row++) {
        newBoardState[row] = [];
        for (let col = 0; col < cols; col++) {
          const alive = board[row][col].classList.contains('alive');
          const neighbors = getNeighbors(row, col);
          if (alive && (neighbors < 2 || neighbors > 3)) {
            newBoardState[row][col] = false;
          } else if (!alive && neighbors === 3) {
            newBoardState[row][col] = true;
          } else {
            newBoardState[row][col] = alive;
          }
        }
      }
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          if (newBoardState[row][col]) {
            board[row][col].classList.add('alive');
          } else {
            board[row][col].classList.remove('alive');
          }
        }
      }
    }
  
    function startGame() {
      intervalId = setInterval(() => {
        updateBoard();
        generations++;
        generationCountElement.textContent = generations;
      }, 100);
      startStopButton.textContent = 'Stop';
    }
  
    function stopGame() {
      clearInterval(intervalId);
      startStopButton.textContent = 'Start';
    }
  
    function clearBoard() {
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          board[row][col].classList.remove('alive');
        }
      }
      generations = 0;
      generationCountElement.textContent = generations;
    }
  
    startStopButton.addEventListener('click', () => {
      if (intervalId) {
        stopGame();
      } else {
        startGame();
      }
    });
  
    clearButton.addEventListener('click', () => {
      stopGame();
      clearBoard();
    });
  
    createBoard();
    randomizeBoard();
  });
  