let currentGame;
let currentDJ;

document.getElementById('game-board').style.display = 'none';
const myCanvas = document.getElementById('the-canvas');
const ctx = myCanvas.getContext('2d');

document.getElementById('game-over-text').style.display = 'none'

document.getElementById('start-button').onclick = () => {
    startGame();
}

document.onkeydown = (e) => {
    let whereToGo = e.keyCode;
    currentGame.dj.moveDJ(whereToGo);
}

function startGame() {
    document.getElementById('game-board').style.display = 'block';
    //restartBtn.style.display = 'block'
    document.getElementById('start-button').style.display = 'none'
    document.getElementById('logo-img').style.display = 'none'
    document.getElementById('splash-text').style.display = 'none'
    document.querySelector('.arrows-img').style.display = 'none'
    //Instantiate a new game of the game class
    currentGame = new Game();
    //Instantiate a new DJ
    currentDJ = new DJ();
    currentGame.dj = currentDJ;
    currentGame.dj.drawDJ();
    updateCanvas();
}

function detectCollision(obstacle) {
    return !((currentDJ.y > obstacle.y + obstacle.height) || 
    (currentDJ.x + currentDJ.width < obstacle.x) || 
    (currentDJ.x - currentDJ.width  > obstacle.x + obstacle.width))
}

let obstaclesFrequency = 0;

function updateCanvas() {
    ctx.clearRect(0, 0, 500, 600);
    const bgImg = new Image();
    bgImg.src = '/images/crowd.jpeg'
    ctx.drawImage(bgImg, 0, 0, myCanvas.width, myCanvas.height);
    
    currentGame.dj.drawDJ();
    obstaclesFrequency++;

    if (obstaclesFrequency % 100 === 1) {
        //Draw an obstacle
        let randomObstacleX = Math.floor(Math.random() * 450);
        let randomObstacleY = 0;
        let randomObstacleWidth = Math.floor(Math.random() * 50) + 20;
        let randomObstacleHeight = Math.floor(Math.random() * 50) + 20;
        let newObstacle = new Obstacle(
            randomObstacleX, 
            randomObstacleY, 
            randomObstacleWidth, 
            randomObstacleHeight);

        currentGame.obstacles.push(newObstacle);
        //console.log(currentGame.obstacles);
    }

    for(let i = 0; i<currentGame.obstacles.length; i++) {
        currentGame.obstacles[i].x += 1;
        currentGame.obstacles[i].drawObstacle();

        if (detectCollision(currentGame.obstacles[i])) {
            alert('OH NO COLLISION!')
            obstaclesFrequency = 0;
            currentGame.score = 0;
            document.getElementById('score').innerHTML = 0;
            currentGame.obstacles = [];
            document.getElementById('game-board').style.display = 'none';
        }

        // Obstacle moved outside the canvas
        if (currentGame.obstacles.length > 0 && currentGame.obstacles[i].y >= 600) {
            currentGame.obstacles.splice(i, 1);
            currentGame.score++;
            document.getElementById('score').innerHTML = currentGame.score;
        }
    }

    requestAnimationFrame(updateCanvas);
}