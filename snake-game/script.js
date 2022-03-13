let canvas = document.getElementById('canvas');
var direction = 'right';

let snakePos = {
    x : 10,
    y : 10
}

let snakeBody = [snakePos, {x:20,y:10}];
const nodeSize = 10;
let foodPos ={
    x :Math.floor(Math.random()*(canvas.width/nodeSize))*nodeSize,
    y :Math.floor(Math.random()*(canvas.height/nodeSize))*nodeSize
}

function drawNode(canvas,x,y,width,height){
    let ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.fillStyle = 'red';
    ctx.fillRect(x,y,width,height);
    ctx.closePath();
}
function removeNode(canvas,x,y,width,height){
    let ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.fillStyle = 'red';
    ctx.clearRect(x,y,width,height)
    ctx.closePath();
}

function drawSnake(snakePosition){
    snakePosition.forEach(elem => {
        drawNode(canvas,elem.x,elem.y,nodeSize,nodeSize);
    });
}

function moveSnake(){
    tailPos = snakeBody.shift();
    removeNode(canvas,tailPos.x,tailPos.y,nodeSize,nodeSize);
    headPos = {
        x : snakeBody[snakeBody.length-1].x,
        y : snakeBody[snakeBody.length-1].y,
    } 

    switch(direction)
    {
    // left
    case 'left':
        snakeBody.push({x : headPos.x - nodeSize, y : headPos.y });
        if(headPos.x === foodPos.x && headPos.y === foodPos.y){
            snakeBody.unshift(tailPos);
            drawFood(false);
        }
        drawSnake(snakeBody);
        // drawFood(true);
        break;

    // up
    case 'up':
        snakeBody.push({x : headPos.x, y : headPos.y - nodeSize });
        if(headPos.x === foodPos.x && headPos.y === foodPos.y){
            snakeBody.unshift(tailPos);
            drawFood(false)
        }
        drawSnake(snakeBody);
        // drawFood(true);
        break;

    // right
    case 'right':
        snakeBody.push({x : headPos.x + nodeSize, y : headPos.y });
        if(headPos.x === foodPos.x && headPos.y === foodPos.y){
            snakeBody.unshift(tailPos);
            drawFood(false);
        }
        // drawFood(true);
        drawSnake(snakeBody);
        break;

    // down
    case 'down':
        snakeBody.push({x : headPos.x, y : headPos.y + nodeSize });
        if(headPos.x === foodPos.x && headPos.y === foodPos.y){
            snakeBody.unshift(tailPos);
            drawFood(false);
        }
        // drawFood(true);
        drawSnake(snakeBody);
        break;

    default:
        break;
    }
}

function isCrash(){
    let headPos = snakeBody.length - 1;
    if(snakeBody[headPos].x < 0 || snakeBody[headPos].y < 0 
        || snakeBody[headPos].x > canvas.width || snakeBody[headPos].y > canvas.height){
        return true;
    }
    if(snakeBody.some((elem,index) => {
        if(index === headPos) return false;
        return elem.x === snakeBody[headPos].x && elem.y === snakeBody[headPos].y
    })){
        return true;
    }
    return false;
}

function drawFood(status){
    //status == false --> new postion
    if(!status){
        foodPos = {
            x :Math.floor(Math.random()*(canvas.width/nodeSize))*nodeSize,
            y :Math.floor(Math.random()*(canvas.height/nodeSize))*nodeSize
        };    
    }
    if (snakeBody.some((elem)=>{
        return elem.x === foodPos.x && elem.y === foodPos.y
    })) {
        drawFood(false);
    } else {
        let ctx = canvas.getContext('2d');
        ctx.beginPath();
        ctx.fillStyle = "green";
        ctx.fillRect(foodPos.x,foodPos.y,nodeSize,nodeSize);
        ctx.closePath();
    };
}

function startGame(){
    document.onkeydown = function(event) {
        let keyCode;
        if(event == null)
        {
            keyCode = window.event.keyCode;
        }
        else
        {
            keyCode = window.event.keyCode;
        }
    
        switch(keyCode)
        {
            // left
            case 37:
                if(direction == 'right') break;
                direction = 'left';
                break;
            // up
            case 38:
                if(direction == 'down') break;
                direction = 'up';
                break;
            // right
            case 39:
                if(direction == 'left') break;
                direction = 'right';
                break;
            // down
            case 40:
                if(direction == 'up') break;
                direction = 'down';
                break;
            default:
                break;
        }
    }

    document.getElementById('again').style.display = "none"

    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    direction = 'right';
    snakePos = {
        x : 10,
        y : 10
    }
    
    snakeBody = [snakePos, {x:20,y:10}];
    let foodPos ={
        x :Math.floor(Math.random()*(canvas.width/nodeSize))*nodeSize,
        y :Math.floor(Math.random()*(canvas.height/nodeSize))*nodeSize
    }

    drawFood();
    let interval = setInterval(function(){
        moveSnake();
        if(isCrash()){
            clearInterval(interval);
            endGame();
        }
    },100);
    
}

function endGame(){
    document.onkeydown = function(event) {
        return null;
    }
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "20px Bungee";
    ctx.fillStyle = 'red';
    ctx.fillText("Game Over", 85,70);
    document.getElementById('again').style.display = "flex";
}

startGame();
