                                                                                                        //draw the canvas
let canvas = document.getElementById("my-canvas");
let ctx = canvas.getContext("2d");
//canvas.style.border = "2px solid black";

                                                                                                        //canvas variables
//let height = canvas.height - 200;
//let middle = canvas.width / 2 + 60;

                                                                                                        //player dimensions
let playerWidth = 90;
let playerHeight = 90;
let playerX = 0;
let playerY = canvas.height / 2 - playerHeight - 5;

                                                                                                        //all varibles
let startBtn = document.querySelector("#start-button");
let restartBtn = document.querySelector("#restart-button");
let logo = document.querySelector("#logo-img");
let gameLogo = document.querySelector("#game-logo");
let arrows = document.querySelector("#arrows-img-div");
let scoreDiv = document.querySelector("#score-div");
let scoreElement = document.querySelector("#score");
let gameBoard = document.querySelector("#game-board");

                                                                                                        //background
let bg = new Image();
bg.src = "images/crowd.jpeg";
let bgFirstImg = 0;
// let bgSecondImg = -canvas.height;                                                                    //used for rolling background

                                                                                                        //Objects for DJ and all obstracles
let dj = new Image();
dj.src = "images/dj_player.png";
let beer = new Image();
beer.src = "images/beer.png";
let underwear = new Image();
underwear.src = "images/underwear.png";
let cd = new Image();
cd.src = "images/cd.jpeg";
let rose = new Image();
rose.src = "images/rose.png";

                                                                                                        //check keyboard strokes
let moveRight = false;
let moveLeft = false;
let moveUp = false
let moveDown = false

                                                                                                        //variables for sizes and movements
let speed = 2;
let intervalId = 0;
let isGameOver = false;
let score = 0;

                                                                                                        //generate random 'X' positions for the obstacles
let randomXPlacement = () => {
  let biggestX = canvas.width + 500;
  let smallestX = 0;
  let randomX = Math.floor(
    Math.random() * (biggestX - smallestX + 1) + smallestX
  );
  return randomX;
};

                                                                                                        //generate random 'Y' positions for the obstacles
let randomYPlacement = () => {
  let biggestY = canvas.height - 20;
  let smallestY = 5;
  let randomY = Math.floor(
    Math.random() * (biggestY - smallestY + 1) + smallestY
  );
  return randomY;
};
                                                                                                      //Obstacles information
let throwArray = [
  { img: beer, x: canvas.width + randomXPlacement(), y: randomYPlacement(), width: 50, height: 50 },
  { img: underwear, x: canvas.width + randomXPlacement(), y: randomYPlacement(), width: 50, height: 50 },
  { img: cd, x: canvas.width + randomXPlacement(), y: randomYPlacement(), width: 50, height: 50 },
  { img: rose, x: canvas.width + randomXPlacement(), y: randomYPlacement(), width: 50, height: 50 },
  { img: beer, x: canvas.width + randomXPlacement(), y: randomYPlacement(), width: 50, height: 50 },
  { img: underwear, x: canvas.width + randomXPlacement(), y: randomYPlacement(), width: 50, height: 50 },
  { img: cd, x: canvas.width + randomXPlacement(), y: randomYPlacement(), width: 50, height: 50 },
  { img: rose, x: canvas.width + randomXPlacement(), y: randomYPlacement(), width: 50, height: 50 },
];

                                                                                                        //start game function
function startGame() {
  canvas.style.display = "block";
  startBtn.style.display = "none";
  logo.style.display = "none";
  gameLogo.style.display = "none";
  arrows.style.display = "none";
  scoreDiv.style.display = "block";
  gameBoard.style.display = "flex";

                                                                                                        //draw background
  ctx.drawImage(bg, 0, bgFirstImg, canvas.width, canvas.height);


  //draw my second background                                                                          // function for moving background
  //ctx.drawImage(bg, 0, bgSecondImg, canvas.width, canvas.height);

  //bgFirstImg += speed;
  //bgSecondImg += speed;
  //this checks for when the background reaches the bottom of canvas
  // if (bgFirstImg > canvas.height) {
  //   bgFirstImg = -canvas.height;
  // }
  // if (bgSecondImg > canvas.height) {
  //   bgSecondImg = -canvas.height;
  // }

                                                                                                      //draw DJ
  ctx.drawImage(dj, playerX, playerY, playerWidth, playerHeight);

  for (let i = 0; i < throwArray.length; i++) {                                                       //draw elements
    ctx.drawImage(
      throwArray[i].img,
      throwArray[i].x,
      throwArray[i].y,
      throwArray[i].width,
      throwArray[i].height
    );
    throwArray[i].x -= speed
    
    //score handling, if obstacle passes dj player... score ++
    if (throwArray[i].x <= 0)
     {
      score = score + 1;
      scoreElement.innerHTML = score;
      intervalId = 0
      throwArray[i].x = canvas.width + randomXPlacement() 
      
      if (score === 10){
        speed += 1
      } else if (score === 20){
        speed += 1
      }
      
    }

    //score handling, if obstacle passes dj player... score ++
    // if (
    //   throwArray[i].y > playerY + playerHeight &&
    //   throwArray[i].y <= playerY + playerHeight + speed
    // ) {
    //   score = score + 1;
    //   scoreElement.innerHTML = score;
    //   intervalId = 0                                                                                //reload element here??
    // }

                                                                                                    //check collision 
    if (
      // checks if the bottom of the player is touching the top of the obstacle
      throwArray[i].y + throwArray[i].height >= playerY + 10 &&
      //checks if the right side of the player is more to the right than the obstacle
      playerX + 120 > throwArray[i].x &&
      // checks if the left side of the player is touching the left side of the obstacle
      playerX < throwArray[i].x + throwArray[i].width &&
      //checks if the bottom of the player car is touching the top of the obstacle
      playerY + playerHeight - 10 > throwArray[i].y
    ) {
      isGameOver = true;
    }
  }

                                                                                                    //move the player
  if (playerX < canvas.width - 150 && moveRight) {                                                    
    playerX += 5;
  } else if (playerX > 35 && moveLeft) {
    playerX -= 5;    
  } else if (playerY > 35 && moveUp) {
    playerY -= 5;
  } else if (playerY > 35 && moveDown) {
    playerY += 5;
  }

                                                                                                    //listener for player movement
  document.addEventListener("keydown", (event) => {
    if (event.code === "ArrowRight") {
      moveRight = true;
    } else if (event.code === "ArrowLeft") {
      moveLeft = true;
    }
      else if (event.code === "ArrowDown") {
        moveDown = true;
    }else if (event.code === "ArrowUp") {
      moveUp = true;
    }
  });
  document.addEventListener("keyup", () => {
    moveRight = false;
    moveLeft = false;
    moveDown = false;
    moveUp = false;
  });

                                                                                                    //if statement for game over
  if (isGameOver) {
    cancelAnimationFrame(intervalId);
    gameover();
  } else {
    intervalId = requestAnimationFrame(startGame);
  }
}

                                                                                                    //restart game function
function restartGame() {
  canvas.style.display = "block";
  startBtn.style.display = "none";
  logo.style.display = "none";
  arrows.style.display = "block";
}

function gameover() {
  canvas.style.display = "none";
  startBtn.style.display = "none";
  logo.style.display = "none";
  arrows.style.display = "none";
  gameLogo.style.display = "block";
  scoreDiv.style.display = "block";
  restartBtn.style.display = "block";
}

  //game begins here
window.addEventListener("load", () => {
  canvas.style.display = "none";
  startBtn.style.display = "block";
  restartBtn.style.display = "none";
  logo.style.display = "block";
  gameLogo.style.display = "none";
  arrows.style.display = "flex";
  scoreDiv.style.display = "none";
  gameBoard.style.display = "none";

  startBtn.addEventListener("click", () => {
    startGame();
    console.log("start button pushed!");
  });
  restartBtn.addEventListener("click", () => {
    restartGame();
  });
});