// script.js
const dino = document.getElementById('dino');
const cactus = document.getElementById('cactus');
const scoreElement = document.getElementById('score');
const gameOverElement = document.getElementById('game-over');

let dinoTop = 150;
let cactusLeft = 500;
let isJumping = false;
let isGameOver = false;
let score = 0;
let gameInterval;

function jump() {
  if (isJumping) return;
  isJumping = true;
  let upInterval = setInterval(() => {
    if (dinoTop <= 50) {
      clearInterval(upInterval);
      let downInterval = setInterval(() => {
        if (dinoTop >= 150) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          dinoTop += 10;
          dino.style.bottom = dinoTop + 'px';
        }
      }, 30);
    } else {
      dinoTop -= 10;
      dino.style.bottom = dinoTop + 'px';
    }
  }, 30);
}

function startGame() {
  gameInterval = setInterval(() => {
    cactusLeft -= 10;
    if (cactusLeft < -30) {
      cactusLeft = 600 + Math.random() * 200;
      score++;
      scoreElement.textContent = 'Score: ' + score;
    }
    cactus.style.left = cactusLeft + 'px';

    // collision detection
    if (cactusLeft < 90 && cactusLeft > 40 && dinoTop > 100) {
      clearInterval(gameInterval);
      isGameOver = true;
      gameOverElement.style.display = 'block';
    }
  }, 50);
}

function resetGame() {
  isGameOver = false;
  dinoTop = 150;
  cactusLeft = 500;
  score = 0;
  scoreElement.textContent = 'Score: 0';
  dino.style.bottom = dinoTop + 'px';
  cactus.style.left = cactusLeft + 'px';
  gameOverElement.style.display = 'none';
  startGame();
}

window.addEventListener('keydown', (e) => {
  if (e.code === 'Space' && !isGameOver) {
    jump();
  }
});

startGame();
