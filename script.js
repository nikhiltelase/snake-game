let segments = document.querySelectorAll(".snake");
let bgAudio = document.getElementById("bg-sound");
let eatAudio = document.getElementById("eat-sound");
let turnAudio = document.getElementById("turn-sound");
let overAudio = document.getElementById("over-sound");
let guidence = document.querySelector(".guidence");
guidence.textContent = "Press Enter To Start Game"

let startingPostion = [
    {l:18, t:0},
    {l:15, t:0},
    {l:12, t:0},
    {l:9, t:0},
    {l:6, t:0},
    {l:3, t:0},
];
//create snake
startingPostion.forEach((postion, index) => {
    let l = postion.l;
    let t = postion.t;
    let segment = segments[index]
    segment.style.left = `${l}px`;
    segment.style.top = `${t}px`;
})
//move snake head
let head = segments[0];
let topPostion = 0;
let leftPostion = 18;
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
    // get currnet postion
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
//extend snake
function extendSnake(){
    // get currnet postion
    let snakeContainer = document.querySelector(".snkae-container");
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
    food.textContent = foodArray[randomIndex];
    let randomLeft = Math.floor(Math.random() * 308) ;
    let randomTop = Math.floor(Math.random() * 408) ;
    food.style.left = `${randomLeft}px`;
    food.style.top = `${randomTop}px`;

    foodLeft = randomLeft;
    foodTop = randomTop;
}
refreshFood();

//detect collitsion with snake tail
function detect(){
    // get currnet postion
    let currnetSegments = document.querySelectorAll(".snake");

    let i = 6;
    while (i < currnetSegments.length) {
        // let bodyLeftPosition  = Number(currnetSegments[i].style.left.replace("px", ""));
        // let leftDistence = bodyLeftPosition - leftPostion;
        // let numLeftDistence = Number(String(leftDistence).replace("-", ""));

        // let bodyTopPosition  = Number(currnetSegments[i].style.top.replace("px", ""));
        // let topDistence = bodyTopPosition -topPostion;
        // let numtopDistence = Number(String(topDistence).replace("-", ""));

        // if (numLeftDistence == 2 && numtopDistence == 2){
        //     return true
        // }
        if (head.style.left == currnetSegments[i].style.left && head.style.top == currnetSegments[i].style.top){  
            return true
        }
        

        i += 1;
    }
}

// change snake direction up, down, left, right
function moveUp(){
    if (snakeDirection !== "down"){
        snakeDirection = "up";
        head.style.transform = "rotate(268deg)";
        // turnAudio.play();
    }
}
function moveDown(){
    if (snakeDirection !== "up"){
        snakeDirection = "down";
        head.style.transform = "rotate(90deg)";
        // turnAudio.play();
    }
}
function moveLeft(){
    if (snakeDirection!== "right") {
        snakeDirection = "left";
        head.style.transform = "rotate(180deg)";       
     //    turnAudio.play();
    }
}
function moveRight(){
    if (snakeDirection !== "left"){
        snakeDirection = "right";
        head.style.transform = "rotate(0deg)";
        // turnAudio.play();
    }
}

//change snake dirction when keybord arrow button press
let playAgain = false;
window.addEventListener('keydown', (event) => {
    // console.log('Key pressed:', event.key); // Log any key press

    switch (event.key) {
        case "Shift":
            if (playAgain){
                location.reload()
            }
            break

        case "Enter":
            startGame();
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

let gameOver = document.querySelector(".game-over");
function startGame(){
    // bgAudio.play();
    bgAudio.volume = 0.2;
    overAudio.volume = 0.4;
    let scoreElement = document.querySelector(".score");
    let score = 0;
    //game loop
    let startGame = setInterval(() => {
    moveHead(snakeDirection);
    moveBody();

    let topDistence = foodTop - topPostion;
    let leftDistence = foodLeft - leftPostion;
    let numTopDistence = Number(String(topDistence).replace("-", ""));
    let numLeftDistence = Number(String(leftDistence).replace("-", ""));

    // detect collistion with food
    if (numTopDistence < 15 && numLeftDistence < 15 ){
        refreshFood();
        extendSnake();   

        //update secore 
        score += 1;
        scoreElement.textContent = `Score: ${score}`; 
        // eatAudio.play()
    }
    //detect collition with wall
    if (topPostion >= 425|| topPostion < -5 || leftPostion >= 332|| leftPostion < -5){
        gameOver.style.display = "flex";
        guidence.textContent = "Press Sift To Play Again.."
        playAgain = true;
        clearInterval(startGame);``
        bgAudio.pause();
        // overAudio.play();
    }
    //detect collition with tail
    if (detect()){
        gameOver.style.display = "flex";
        playAgain = true;
        clearInterval(startGame);
        bgAudio.pause();
        // overAudio.play();
    }

}, 100);

}
//start game
let startGameButton = document.getElementById("startGame");
let start = false;
startGameButton.addEventListener("click", () => {
    if (!start){
        startGame()
        start = true
    }
})

// gameOver()
gameOver.addEventListener("click", () => {
    location.reload();
});

