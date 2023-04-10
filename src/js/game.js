class Game {
    constructor() {
        this.dj = {},
        this.obstacles = [];
        this.score = 0;
        this.img = './images/crowd.jpeg';
    }

    drawBackground(){
        const bgImg = new Image();
        bgImg.src = this.img;
        ctx.drawImage(bgImg, this.x, this.y, this.width, this.height);
    }
}