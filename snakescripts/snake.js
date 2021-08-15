import { update as updateSnake, draw as drawSnake, snakeSpeed } from '/snakescripts/snakeBod.js'

let lastRenderTime = 0;

function gameLoop(currentTime) {
    window.requestAnimationFrame(gameLoop);
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
    if (secondsSinceLastRender < 1 / snakeSpeed) return;

    lastRenderTime = currentTime;
    //console.log('render');
    update();
    draw();

}
window.requestAnimationFrame(gameLoop);

function update() {
    updateSnake();
}

function draw() {
    drawSnake();
}