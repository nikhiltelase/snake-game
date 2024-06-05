let segments = document.querySelectorAll(".snake");
let bgAudio = document.getElementById("bg-sound");
let eatAudio = document.getElementById("eat-sound");
let turnAudio = document.getElementById("turn-sound");
let overAudio = document.getElementById("over-sound");
let guidence = document.querySelector(".guidence");
guidence.textContent = "Press Enter To Start Game"

let playAgain = false;

let startingPostion = [
    {l:6, t:0},
    {l:5, t:0},
    {l:4, t:0},
    {l:3, t:0},
    {l:2, t:0},
    {l:1, t:0},
];
//create snake
startingPostion.forEach((postion, index) => {
    let l = postion.l;
    let t = postion.t;
    let segment = segments[index]
    segment.style.left = `${l}%`;
    segment.style.top = `${t}%`;
})
//move snake head
let head = segments[0];
let topPostion = 0;
let leftPostion = 6;
let snakeDirection = "right";
let step = 1;

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

    head.style.left = `${leftPostion}%`;
    head.style.top = `${topPostion}%`;
}
//move snake body
function moveBody(){
    // get currnet postion
    let currnetSegments = document.querySelectorAll(".snake");

    let index = currnetSegments.length-1;
    //index mean 0, 1, 2, ....length of currnetSegments
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
    let food = document.querySelector(".food");
    let randomLeft = Math.floor(Math.random() * 91) ;
    let randomTop = Math.floor(Math.random() * 91) ;
    food.style.left = `${randomLeft}%`;
    food.style.top = `${randomTop}%`;

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
        let bodyLeftPosition  = Number(currnetSegments[i].style.left.replace("%", ""));
        let leftDistence = bodyLeftPosition - leftPostion;
        let numLeftDistence = Number(String(leftDistence).replace("-", ""));

        let bodyTopPosition  = Number(currnetSegments[i].style.top.replace("%", ""));
        let topDistence = bodyTopPosition -topPostion;
        let numtopDistence = Number(String(topDistence).replace("-", ""));

        // if (numLeftDistence == 2 && numtopDistence == 2){
        //     return true
        // }
        if (head.style.left == currnetSegments[i].style.left && head.style.top == currnetSegments[i].style.top){  
            return true
        }
        

        i += 1;
    }
}
// detect()

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
            //check snake direction not equal to down than turn it up
            if (head.style.transform !== "rotate(90deg)"){
                snakeDirection = "up";
                // head.style.transform = "rotate(268deg)";
                // turnAudio.play();
            }
            break;

        case 'ArrowDown':
            //check snake direction not equal to up than turn it down
            if (head.style.transform !== "rotate(268deg)"){
                snakeDirection = "down";
                // head.style.transform = "rotate(90deg)";
                // turnAudio.play();
            }
            break;

        case 'ArrowLeft':
            //check snake direction not equal to right than turn it left
           if (head.style.transform !== "rotate(0deg)") {
               snakeDirection = "left";
            //    head.style.transform = "rotate(180deg)";       
            //    turnAudio.play();
           }
            break;

        case 'ArrowRight':
        //check snake direction not equal to left than turn it right
            if (head.style.transform !== "rotate(180deg)"){
                snakeDirection = "right";
                // head.style.transform = "rotate(0deg)";
                // turnAudio.play();
            }
            break;

        default:
            return;
    }
});



function startGame(){
    // bgAudio.play();
    let secoreElement = document.querySelector(".secore");
    let secore = 0;
    //game loop
    let startGame = setInterval(() => {
    moveHead(snakeDirection);
    moveBody();

    let topDistence = foodTop - topPostion;
    let leftDistence = foodLeft - leftPostion;
    let numTopDistence = Number(String(topDistence).replace("-", ""));
    let numLeftDistence = Number(String(leftDistence).replace("-", ""));
    // detect collistion with food
    if (numTopDistence < 5 && numLeftDistence < 5 ){
        refreshFood();
        extendSnake();   
        //update secore 
        secore += 1;
        secoreElement.textContent = `Secore: ${secore}`; 
        eatAudio.play()
    }
    //detect collition with wall
    if (topPostion > 92 || topPostion < -1 || leftPostion > 91 || leftPostion < -2){
        // bgAudio.pause();
        gameOver.style.display = "flex";
        guidence.textContent = "Press Sift To Play Again.."
        playAgain = true;
        overAudio.play();
        clearInterval(startGame);
    }
    //detect collition with tail
    if (detect()){
        // bgAudio.pause();
        gameOver.style.display = "flex";
        playAgain = true;
        overAudio.play();
        clearInterval(startGame);
    }

}, 70);

}

// gameOver()
let gameOver = document.querySelector(".game-over");
gameOver.addEventListener("click", () => {
    location.reload();
});
