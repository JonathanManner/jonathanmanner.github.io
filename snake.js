import { update as updateSnake, draw as drawSnake, snakeSpeed } from '/snakeBod.js'

let lastRenderTime = 0;

function gameLoop(currentTime) {
    window.requestAnimationFrame(gameLoop);
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
    if (secondsSinceLastRender < 1 / snakeSpeed) return;

    lastRenderTime = currentTime;



}
window.requestAnimationFrame(gameLoop);

function update() {
    updateSnake();
}

function draw() {
    drawSnake();
}