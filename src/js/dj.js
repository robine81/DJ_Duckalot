class DJ {
    constructor(){
      this.x = 220;
      this.y = 0;
      this.width = 50;
      this.height = 80;
      this.img = './images/logo.jpeg';
    }
    
    drawDJ(){
      const djImg = new Image();
      djImg.src = this.img;
      ctx.drawImage(djImg, this.x, this.y, this.width, this.height);
    }

    moveDJ(keyCode){
      console.log('x', this.x);
      console.log('y', this.y);
      ctx.clearRect(this.x, this.y, this.width, this.height);
      switch(keyCode){
        case 38:
        //Making sure car doesn't go off the road
        if(this.y > 20){
          this.y -= 10;
        }
          break;
        case 40:
        //Making sure car doesn't go off the road
        if (this.y < 430 ){
          this.y += 10;
        }
          break;
      }
    }
  }