const gameContainer = document.getElementById("game-container");
const snakeHead = document.getElementById("snake-head");
const food = document.getElementById("food");

let snakeX = 0;
let snakeY = 0;
let foodX;
let foodY;
let gridSize = 20;
let velocityX = 1;
let velocityY = 0;
let tail = [];

function update() {
    snakeX += velocityX * gridSize;
    snakeY += velocityY * gridSize;

    // Check for collision with food
    if (snakeX === foodX && snakeY === foodY) {
        // Increase the snake's length
        tail.push({});
        // Generate new food
        generateFood();
    }

    // Move the tail
    for (let i = tail.length - 1; i > 0; i--) {
        tail[i].x = tail[i - 1].x;
        tail[i].y = tail[i - 1].y;
    }

    if (tail.length > 0) {
        tail[0].x = snakeX;
        tail[0].y = snakeY;
    }

    // Check for collision with walls or tail
    if (snakeX < 0 || snakeX >= gameContainer.clientWidth || snakeY < 0 || snakeY >= gameContainer.clientHeight || checkCollision()) {
        gameOver();
        return;
    }

    // Update snake's head position
    snakeHead.style.left = snakeX + "px";
    snakeHead.style.top = snakeY + "px";

    // Update the tail
    for (let i = 0; i < tail.length; i++) {
        const segment = tail[i];
        const segmentElement = document.createElement("div");
        segmentElement.className = "snake-segment";
        segmentElement.style.left = segment.x + "px";
        segmentElement.style.top = segment.y + "px";
        gameContainer.appendChild(segmentElement);
    }
}

function generateFood() {
    foodX = Math.floor(Math.random() * gameContainer.clientWidth / gridSize) * gridSize;
    foodY = Math.floor(Math.random() * gameContainer.clientHeight / gridSize) * gridSize;
    food.style.left = foodX + "px";
    food.style.top = foodY + "px";
}

function checkCollision() {
    for (let i = 0; i < tail.length; i++) {
        if (snakeX === tail[i].x && snakeY === tail[i].y) {
            return true;
        }
    }
    return false;
}

function gameOver() {
    alert("Game Over!");
    location.reload();
}

generateFood();
setInterval(update, 100); // Update the game every 100ms
