let gameBoard = [];
let currentPlayer = 'X';
let gameOver = false;

const cells = document.querySelectorAll('.cell');
const gameStatusElement = document.querySelector('#game-status');
const resetButton = document.querySelector('#reset-button');

function initGameBoard() {
    for (let i = 0; i < 9; i++) {
        gameBoard.push('');
    }
}

function handleCellClick(event) {
    if (gameOver) return;
    const cellIndex = event.target.id.split('-')[1];
    if (gameBoard[cellIndex] === '') {
        gameBoard[cellIndex] = currentPlayer;
        event.target.textContent = currentPlayer;
        checkGameStatus();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkGameStatus() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < winningCombinations.length; i++) {
        const combination = winningCombinations[i];
        if (gameBoard[combination[0]] === gameBoard[combination[1]] && gameBoard[combination[1]] === gameBoard[combination[2]] && gameBoard[combination[0]] !== '') {
            gameOver = true;
            gameStatusElement.textContent = `Player ${gameBoard[combination[0]]} wins!`;
            return;
        }