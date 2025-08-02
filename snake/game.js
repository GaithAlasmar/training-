import{SNAKE_SPEED, 
    update as updateSnake, 
    draw as drawSnake,
    getSnakeHead,
    snakeIntersection,
} 
    from "./snake.js";

import{
    update as updateFood, 
    draw as drawFood} 
    from "./food.js";

import { outsideGrid } from "./grid.js";
let lastReanderTime = 0;
const gameBoard = document.getElementById('game-board');
let gameOver = false;

function main(currentTime){
    if(gameOver){
        if(confirm('You Lost. Press Ok to restart.')){
            location = "/";
        }
        return;
    
}

    window.requestAnimationFrame(main);
    const secondSinceLastReader = (currentTime - lastReanderTime)/1000;
    if(secondSinceLastReader < 1/SNAKE_SPEED) return;
    lastReanderTime =currentTime; 

    update();
    draw();
}
window.requestAnimationFrame(main);




function update(){
    updateSnake();
    updateFood();
    checkDeath();
}

function draw(){
    gameBoard.innerHTML = '';
    drawSnake(gameBoard);
    drawFood(gameBoard);
}

function checkDeath(){
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}