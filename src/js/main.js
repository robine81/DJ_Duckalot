//draw the canvas
let canvas = document.getElementById("my-canvas");
let ctx = canvas.getContext("2d");
canvas.style.border = "2px solid black";

//canvas variables
let height = canvas.height - 200;
let middle = canvas.width / 2 + 60;

//player car dimensions
let playerWidth = 130;
let playerHeight = 150;
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
bg.src = "/images/crowd.jpeg";
let bg1Y = 0;
let bg2Y = -canvas.height;

//DJ and all obstracles
let dj = new Image();
dj.src = "/images/DJ.jpeg";
let carPink = new Image();
carPink.src = "/images/beer.png";
let carWhite = new Image();
carWhite.src = "/images/underwear.jpeg";
let carYellow = new Image();
carYellow.src = "/images/cd.jpeg";
let bus = new Image();
bus.src = "/images/rose.jpeg";
// let motorcycle = new Image();
// motorcycle.src = "../images/motorcycle.png";

let moveRight = false;
let moveLeft = false;
let moveUp = false
let moveDown = false

//variables for sizes and movements
let speed = 5;
let intervalId = 0;
let isGameOver = false;
let score = 0;

//generate random 'X' positions on the road for the traffic
let randomXPlacement = () => {
  let biggestX = canvas.width - 350;
  let smallestX = 55;
  let randomX = Math.floor(
    Math.random() * (biggestX - smallestX + 1) + smallestX
  );
  console.log(randomX);
  return randomX;
};
//traffic cars information
let throwArray = [
  { img: carPink, x: randomXPlacement(), y: -200, width: 110, height: 170 },
  {
    img: carWhite,
    x: randomXPlacement() - 300,
    y: -800,
    width: 130,
    height: 220,
  },
  { img: carYellow, x: randomXPlacement(), y: -1600, width: 130, height: 220 },
  { img: bus, x: randomXPlacement(), y: -2300, width: 240, height: 520 },
  { img: carPink, x: randomXPlacement(), y: -3000, width: 110, height: 170 },
  {
    img: carWhite,
    x: randomXPlacement() - 300,
    y: -3700,
    width: 130,
    height: 220,
  },
  { img: carYellow, x: randomXPlacement(), y: -4300, width: 130, height: 220 },
  { img: bus, x: randomXPlacement(), y: -5000, width: 240, height: 520 },
];

//start game function
function startGame() {
  canvas.style.display = "block";
  startBtn.style.display = "none";
  logo.style.display = "none";
  gameLogo.style.display = "none";
  arrows.style.display = "none";
  scoreDiv.style.display = "none";
  gameBoard.style.display = "flex";

  //draw background
  ctx.drawImage(bg, 0, bg1Y, canvas.width, canvas.height);
  //draw my second background
  ctx.drawImage(bg, 0, bg2Y, canvas.width, canvas.height);

  //moving background
  //bg1Y += speed;
  //bg2Y += speed;
  //this checks for when the background reaches the bottom of canvas
  // if (bg1Y > canvas.height) {
  //   bg1Y = -canvas.height;
  // }
  // if (bg2Y > canvas.height) {
  //   bg2Y = -canvas.height;
  // }

  //draw DJ
  ctx.drawImage(dj, playerX, playerY, playerWidth, playerHeight);

  for (let i = 0; i < throwArray.length; i++) {
    ctx.drawImage(
      throwArray[i].img,
      throwArray[i].x,
      throwArray[i].y,
      throwArray[i].width,
      throwArray[i].height
    );
    throwArray[i].y += speed;
    //ctx.drawImage(dj, middle + 50, height, 80, 150);
    if (throwArray[i].y > canvas.height) {
      throwArray[i].y = -5500;
    }

    //score handling login (inside of for loop!), if traffic car passes player car... score ++
    if (
      throwArray[i].y > playerY + playerHeight &&
      throwArray[i].y <= playerY + playerHeight + speed
    ) {
      score = score + 1;
      scoreElement.innerHTML = score;
    }

    //collision inside of for loop
    if (
      // checks if the bottom of the traffic car is touching the top of the player car
      throwArray[i].y + throwArray[i].height >= playerY + 10 &&
      //checks if the right side of the player car is more to the right than the traffic car
      playerX + 120 > throwArray[i].x &&
      // checks if the left side of the player car is touching the left side of the traffic car
      playerX < throwArray[i].x + throwArray[i].width &&
      //checks if the bottom of the player car is touching the top of the traffic car
      playerY + playerHeight - 10 > throwArray[i].y
    ) {
      isGameOver = true;
    }
  }

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