let gameSequence = [];
let userSequence = [];
let score = 0;
let currentLevel = 0;

const colorButtons = document.querySelectorAll('.color-button');
const scoreElement = document.querySelector('#score');

function generateRandomColor() {
    const colors = ['red', 'blue', 'green', 'yellow'];
    return colors[Math.floor(Math.random() * colors.length)];
}

function playGameSequence() {
    gameSequence.forEach((color, index) => {
        setTimeout(() => {
            const button = document.getElementById(color);
            button.classList.add('active');
            setTimeout(() => {
                button.classList.remove('active');
            }, 500);
        }, index * 1000);
    });
}

function handleUserInput(event) {
    const color = event.target.id;
    userSequence.push(color);
    checkUserSequence();
}

function checkUserSequence() {
    if (userSequence.length === gameSequence.length) {
        if (userSequence.join(',') === gameSequence.join(',')) {
            score++;
            scoreElement.textContent = score;
            currentLevel++;
            gameSequence = [];
            userSequence = [];
            generateNextLevel();
        } else {
            alert('Game Over! Your score is ' + score);
            score = 0;
            scoreElement.textContent = score;
            currentLevel = 0;
            gameSequence = [];
            userSequence = [];
        }
    }
}

function generateNextLevel() {
    for (let i = 0; i < currentLevel + 1; i++) {
        gameSequence.push(generateRandomColor());
    }
    playGameSequence();
}

colorButtons.forEach(button => button.addEventListener('click', handleUserInput));

generateNextLevel();