// script.js - Interactive Neon T-Rex Runner
const dino = document.getElementById('dino');
const cactus = document.getElementById('cactus');
const bird = document.getElementById('bird');
const cloud = document.getElementById('cloud');
const scoreElement = document.getElementById('score');
const gameOverElement = document.getElementById('game-over');

let dinoTop = 150;
let cactusLeft = 500;
let birdLeft = 600;
let cloudLeft = 200;
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
    // Cactus movement
    cactusLeft -= 10;
    if (cactusLeft < -30) {
      cactusLeft = 600 + Math.random() * 200;
      score++;
      scoreElement.textContent = 'Score: ' + score;
    }
    cactus.style.left = cactusLeft + 'px';

    // Bird movement
    birdLeft -= 12;
    if (birdLeft < -40) {
      birdLeft = 600 + Math.random() * 300;
      bird.style.top = Math.random() * 80 + 'px';
    }
    bird.style.left = birdLeft + 'px';

    // Cloud movement away from mouse
    cloud.style.left = cloudLeft + 'px';

    // Collision detection
    if (cactusLeft < 90 && cactusLeft > 40 && dinoTop > 100) {
      clearInterval(gameInterval);
      isGameOver = true;
      gameOverElement.style.display = 'block';
    }
    if (birdLeft < 90 && birdLeft > 40 && dinoTop < 100) {
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
  birdLeft = 600;
  cloudLeft = 200;
  score = 0;
  scoreElement.textContent = 'Score: 0';
  dino.style.bottom = dinoTop + 'px';
  cactus.style.left = cactusLeft + 'px';
  bird.style.left = birdLeft + 'px';
  cloud.style.left = cloudLeft + 'px';
  gameOverElement.style.display = 'none';
  startGame();
}

// Cloud moves away from mouse
window.addEventListener('mousemove', (e) => {
  let mouseX = e.clientX;
  if (mouseX < cloudLeft + 50) {
    cloudLeft += 5;
  } else {
    cloudLeft -= 5;
  }
});

window.addEventListener('keydown', (e) => {
  if (e.code === 'Space' && !isGameOver) {
    jump();
  }
});

startGame();
