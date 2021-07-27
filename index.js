//Game Constants and Variables
let inputDir = {x: 0, y: 0};  //snake will move when buttons are clicked
const foodSound = new Audio('food.mp3');
const gameOverSound = new Audio('gameoversound.mp3');
const moveSound = new Audio('move.mp3'); //Download a new moving sound
const musicSound = new Audio('music.mp3'); // download this also
let speed = 6;
let lastPaintTime = 0;
let snakeArr = [
    {x: 13, y: 15}
]     // in JS : positive x axis is in right dir (according to grid made) and y positive axis is in downwards dir.

food = {x: 6, y: 7};
//Game Functions
function main(ctime){    //ctime is current time
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}  
function isCollide(snake){
    //If snake bump into himself
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y)
        {
            return true;
        }
    }
    //If you bump into the wall
    if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0){
        return true;
    }
    return false;
}
function gameEngine(){

    //Part 1: Updating snake array and food

    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir = {x: 0, y: 0};
        alert("Game Over! Press any key to Play Again");
        snakeArr = [{x: 13, y: 15}]; //Snake reset
        musicSound.play();
        score = 0;
    }

    // If you have eaten the food, increment the score and regenerate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play();
        //score += 1;
        //scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y}) //Will add element at the start of the array
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random())}
    }

    //Moving the Snake

    for (let i = snakeArr.length - 2; i >= 0; i--)
    //i has been started from second box of the snake body, >= 0 is head of snake
    {      
        snakeArr[i + 1] = {...snakeArr[i]};  //Body boxes will be equal   //triple dots : new object snakeArr[i]       
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    //Part 2: Display the snake and food
    //Display Snake

    board.innerHTML = ""; //Board emptied
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');  //new element created
        snakeElement.style.gridRowStart = e.y;  //In which row, row will be in y axis
        snakeElement.style.gridColumnStart = e.x;  //In which col, col will be in x axis
        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

    //Display food
    foodElement = document.createElement('div');  //new element created
        foodElement.style.gridRowStart = food.y;  //In which row, row will be in y axis
        foodElement.style.gridColumnStart = food.x;  //In which col, col will be in x axis
        foodElement.classList.add('food')
        board.appendChild(foodElement);
    
}
//Main Logic starts here
window.requestAnimationFrame(main);   // For game loop, you can also use set Interval but this is advised :) (argument is a func)  //rqst animatn frme  v/s set interval : see stackoverflow ans
window.addEventListener('keydown', e => {  //Arguments of Add function: First is event and second is arrow function
    inputDir = {x: 0, y: 1} //Start the game
    moveSound.play(); //Music will start playing
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;       //InputDir is kind of velocity where and how will snake move
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

       case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
});