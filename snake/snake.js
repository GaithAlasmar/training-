import {getInputDirection} from "./input.js"

export const  SNAKE_SPEED = 5;
const snakeBody =[{x:11,y:11},];
let newSegments = 0;


export function update(){
    addSegments()
    let inputDirection= getInputDirection();
    for(let i = snakeBody.length-2; i>=0;i--){
        snakeBody[i+1] ={...snakeBody[i]}
    }
    snakeBody[0].x += inputDirection.x;
    snakeBody[0].y += inputDirection.y;
    
}
export function draw(gameBoard){
    snakeBody.forEach(segment =>{
        const snakElement = document.createElement('div');
        snakElement.style.gridColumnStart = segment.x;
        snakElement.style.gridRowStart = segment.y;
        snakElement.classList.add("snake")
        gameBoard.appendChild(snakElement);
    })
}



export function expandSnake(amuont){
        newSegments += amuont;
}

export function onSnake(position,{ignoreHead = false} = {}){
        return snakeBody.some((segment, index) =>{
            if(ignoreHead && index === 0)return false;
            return equalPosition(segment,position)
        })
}

export function getSnakeHead(){
    return snakeBody[0];
}
export function snakeIntersection(){
    return onSnake(snakeBody[0],{ignoreHead: true});
}

function equalPosition(pos1 , pos2){
       return pos1.x === pos2.x && pos1.y === pos2.y
}

function addSegments(){
    for(let i = 0; i < newSegments; i++){
        snakeBody.push({...snakeBody[snakeBody.length - 1]})    
    }
    newSegments = 0;
}