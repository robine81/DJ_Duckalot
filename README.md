# DJ Duckalot

[Click here to see deployed game](https://github.com/robine81/DJ_Duckalot)

## Description
DJ Duckalot is touring the world and playing at various clubs from Ibiza to Berlin to Tulum. But the later it gets, the crazier the crowd goes. it can happen that some throw things at the DJ. Some things to show appreciation and other things when they want him to play "something better". It can be everything from beer glasses, drinks, cocktails to CDs and roses and pen drives. If DJ Duckalot manages to duck the bad ones, he is safe, but if he gets hit, he will loose 10 points. If he catches a rose or a CD from the crowd, then he will gain 10 points. Once he reaches 0 he will loose the game.


## MVP (DOM-CANVAS)
_MVP definition here, list of minimum features_
- game has one DJ standing on the left hand side of the screen that moves vertically
- random object comes from the right hand side of the screen towards the DJ
- if hit by a beer glass, a drink or a cocktail, then the DJ will loose life points
- if hit by a CD, usb or a rose, the DJ will gain life points
- reach 0 points and it's game over
- increasing difficulty


## Backlog
_List of features you might implement after the MVP_
- add scoreboard
- change sprite
- change scenery
- decide which music track

## Data structure
_List of classes and methods_
# main.js

- buildSplashScreen () {}
- buildGameScreen () {}
- buildGameOverScreen () {}

# game.js

- game () {}
- startLoop () {}
- checkCollisions () {}
- addThrownObj () {}
- clearCanvas () {}
- updateCanvas () {}
- drawCanvas () {}
- gameOver () {}

# dj.js 

- DJ () {
    this.x;
    this.y;
    this.direction;
    this.size
}
- draw () {}
- move () {}
- checkScreenCollision () {}

# thrownObj.js 

- ThrownObj () {
    this.x;
    this.y;
    this.direction;
    this.size
}
- draw () {}
- move () {}
- checkCollision () {}

## States and States Transitions
_List of states (views) of your game_
- splashScreen
- gameScreen
- gameOverScreen


## Task
_List of tasks in order of priority_



## Links

- [Trello Link](https://trello.com/invite/b/s2EZHQlx/ATTIba21209239a0070e7ca9fab61a337fc42AFA9931/dj-duckalot-game
- [Slides Link](http://slides.com)
- [Github repository Link](https://github.com/robine81/DJ_Duckalot)
- [Deployment Link](http://github.com)