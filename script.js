let snakeContainer = document.querySelector(".snkae-container");
let segments = document.querySelectorAll(".snake");
let bgAudio = document.getElementById("bg-sound");
let eatAudio = document.getElementById("eat-sound");
let turnAudio = document.getElementById("turn-sound");
let overAudio = document.getElementById("over-sound");
let gameOver = document.querySelector(".game-over");
let guidence = document.querySelector(".guidence");
let scoreElement = document.querySelector(".score");
let highSecoreElemnet = document.querySelector(".hight-score");


bgAudio.volume = 0.2;
overAudio.volume = 0.4;
guidence.textContent = "Press Enter To Start Game"

let score = 0;
let highSecore = 0;
let playAgain = false;
let start = true;

//move snake head
let head = segments[0];
let topPostion = 0;
let leftPostion = 0;
let snakeDirection = "right";
let step = 10;

function moveHead(direction){
    switch (direction) {
        case "left":
            leftPostion -= step;
            break;
        case "right":
            leftPostion += step;
            break;
        case "up":
            topPostion -= step;
            break;
        case "down":
            topPostion += step;
            break;
        default:
            break;
    }
    head.style.left = `${leftPostion}px`;
    head.style.top = `${topPostion}px`;
}

//move snake body
function moveBody(){
    let currnetSegments = document.querySelectorAll(".snake");
    let index = currnetSegments.length-1;
    //index mean length of currnetSegments to ....3, 2, 1, 0 
    while (index > 0) {
        let newL = currnetSegments[index-1].style.left;
        let newT = currnetSegments[index-1].style.top;
        currnetSegments[index].style.left = newL;
        currnetSegments[index].style.top = newT;
        index -= 1;
    }
}

// change snake direction up, down, left, right
function moveUp(){
    if (snakeDirection !== "down"){
        snakeDirection = "up";
        head.style.transform = "rotate(268deg)";
        turnAudio.play();
    }
}
function moveDown(){
    if (snakeDirection !== "up"){
        snakeDirection = "down";
        head.style.transform = "rotate(90deg)";
        turnAudio.play();
    }
}
function moveLeft(){
    if (snakeDirection!== "right") {
        snakeDirection = "left";
        head.style.transform = "rotate(180deg)";       
        turnAudio.play();
    }
}
function moveRight(){
    if (snakeDirection !== "left"){
        snakeDirection = "right";
        head.style.transform = "rotate(0deg)";
        turnAudio.play();
    }
}

//extend snake
function extendSnake(){
    let currnetSegments = document.querySelectorAll(".snake");
    let lastSegment = currnetSegments[currnetSegments.length-1];
    let newSegment = document.createElement("div");
    //new segment go to last segment position
    newSegment.style.left = lastSegment.style.left;
    newSegment.style.top = lastSegment.style.top;
    newSegment.classList.add("snake");
    newSegment.textContent = "🟢";
    snakeContainer.appendChild(newSegment);
}

// crate food
let foodLeft ;
let foodTop ;
function refreshFood(){
    let foodArray = ["🍎", "🍍", "🍉", "🍅", "🍑", "🍓", "🥝", "🍒", "🍈", "🍇", "🍋", "🥕", "🍏", "🍐"]
    let randomIndex = Math.floor(Math.random() * foodArray.length);
    let food = document.querySelector(".food");
    foodTop = Math.floor(Math.random() * 408) ;
    foodLeft = Math.floor(Math.random() * 308) ;
    food.textContent = foodArray[randomIndex];
    food.style.left = `${foodLeft}px`;
    food.style.top = `${foodTop}px`;
}
refreshFood();

//detect collitsion with snake body
function detectBody(){
    let currnetSegments = document.querySelectorAll(".snake");

    for (let i = 2; i < currnetSegments.length; i++) {
        if (head.style.left == currnetSegments[i].style.left && head.style.top == currnetSegments[i].style.top){  
            return true
        }  
    }
}

//start game
function startGame(){
    bgAudio.play();
    let startGame = setInterval(() => {
    moveHead(snakeDirection);
    moveBody();
    let topDistence = foodTop - topPostion;
    let leftDistence = foodLeft - leftPostion;
    let numTopDistence = Number(String(topDistence).replace("-", ""));
    let numLeftDistence = Number(String(leftDistence).replace("-", ""));
    console.log(foodTop)
    console.log(topPostion)
    if(foodTop == topPostion && foodLeft == leftPostion){
        console.log("ture")
    }
    // detect collistion with food
    if (numTopDistence < 15 && numLeftDistence < 15 ){
        refreshFood();
        extendSnake();   
        score += 1;
        scoreElement.textContent = `Score: ${score}`; 
        eatAudio.play()
    }
    //detect collition with wall
    if (topPostion >= 425|| topPostion < -5 || leftPostion >= 332|| leftPostion < -5){
        gameOver.style.display = "flex";
        guidence.textContent = "Press Sift To Play Again.."
        playAgain = true;
        clearInterval(startGame);
        bgAudio.pause();
        overAudio.play();
        return
    }
    //detect collition with body
    if (detectBody()){
        gameOver.style.display = "flex";
        playAgain = true;
        clearInterval(startGame);
        bgAudio.pause();
        overAudio.play();
        return
    }
}, 100);
}

//play again
function resetSnake(){
    snakeContainer.innerHTML = `
    <div class="snake head">🔴</div>
    <div class="snake">🟢</div>
    <div class="snake">🟢</div>
    <div class="snake">🟢</div>
    <div class="snake">🟢</div>
    `;
    let currnetSegments = document.querySelectorAll(".snake");
    head = currnetSegments[0];
    head.style.top = "0px";
    head.style.left = "0px";
    topPostion = 0;
    leftPostion = 0;
    snakeDirection = "right";
    moveBody();
    refreshFood();
    gameOver.style.display = "none";
    if (score > highSecore){
        highSecore = score;
        highSecoreElemnet.textContent = `High Score: ${highSecore}`;
    }
    score = 0;
    scoreElement.textContent = `Score: ${score}`; 
    start = true;
    playAgain = false;
}

//start button
let startGameButton = document.getElementById("startGame");
startGameButton.addEventListener("click", () => {
    if (start){
        startGame()
        start = false
    }
})

//play agian button
let playAgainButton = document.getElementById("playAgain");
playAgainButton.addEventListener("click", () => {
    resetSnake();
});


//keybord controls for pc or laptop
window.addEventListener('keydown', (event) => {
    // console.log('Key pressed:', event.key); // Log any key press

    switch (event.key) {
        case "Shift":
            if (playAgain){
                resetSnake();
            }
            break

        case "Enter":
            if (start){
                startGame()
                start = false
            }
            break

        case 'ArrowUp': 
            moveUp();
            break;

        case 'ArrowDown':
            moveDown();
            break;

        case 'ArrowLeft':
            moveLeft();
            break;

        case 'ArrowRight':
            moveRight();
            break;

        default:
            return;
    }
});

//when scree mobile hide guidece and show arrow buttons
let guidContainer = document.querySelector(".guide-container");
let arrowbuttons = document.querySelector(".arrow-buttons");

const gameScreen = window.matchMedia("(max-width: 500px)");

if (gameScreen.matches) {
    guidContainer.style.display = "none";
    arrowbuttons.style.display = "flex";
}