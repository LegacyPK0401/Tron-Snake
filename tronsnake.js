class TronSnake {
  constructor(x, y, size) {
    this.x = x
    this.y = y
    this.size = size
    this.tail = [{
      x: this.x,
      y: this.y
    }]
    this.rotateX = 0
    this.rotateY = 1

  }

  move() {
    var newRect;
    if (this.rotateX == 1) {
      newRect = {
        x: this.tail[this.tail.length - 1].x + this.size
        y: this.tail[this.tail.length - 1].y
      }
    } else if (this.rotateX == -1) {
      newRect = {
        x: this.tail[this.tail.length - 1].x - this.size
        y: this.tail[this.tail.length - 1].y
      }
    } else if (this.rotateY == 1) {
      newRect = {
        x: this.tail[this.tail.length - 1].x
        y: this.tail[this.tail.length - 1].y + this.size
      }
    } else if (this.rotateY == -1) {
      newRect = {
        x: this.tail[this.tail.length - 1].x
        y: this.tail[this.tail.length - 1].y - this.size
      }
    }

    this.tail.shift()
    this.tail.push(newRect)
  }
}




class Light(){
  constructor(){
    var isTouching;
    while(true){
      isTouching = false;
      this.x = Math.floor(Math.random() * canvas.width / lightcycle.size) * lightcycle.size
      this.y = Math.floor(Math.random() * canvas.height / lightcycle.size) * lightcycle.size
      for(var i = 0; i < lightcycle.tail.length;i++){
        if(this.x == lightcycle.tail[i].x && this.y == lightcycle.tail.[i].y){
          isTouching = true
        }
      }
      if(!isTouching){
        break;
      }
      this.color = "pink"
      this.size = lightcycle.size
    }
  }
}

var canvas = document.getElementById("canvas")

var lightcycle = new TronSnake();

var idendisc = new Light();

var canvasContext = canvas.getContext('2d');

window.onload = () => {
  gameLoop();
}

function gameLoop() {
  setInterval(show, 1000 / 15) // here 15 is our fps value
}

function show() {
  update();
  draw();
}

function update(){

}

function draw(){
  createRect(0,0,canvas.width, canvas.height, "black")
  createRect(0,0, canvas.width, canvas.height)
  for(var i =0; i < lightcycle.tail.length; i++){
    createRect(lightcycle.tail[i].x + 2.5, lightcycle.tail[i].y + 2.5
        lightcycle.size - 5, lightcycle.size - 5, 'white')
  }

  canvasContext.font = "20px Arial"
  canvasContext.fillStyle = "#00FF42"
  canvasContext.fillText("Score: ",(lightcycle.tail.length +1),
      canvas.width -120, 18);
      createRect(idendisc.x, idendisc.y, idendisc.size, idendisc.size, idendisc,color)
}

function createRect(x, y, width, height, color){
    canvasContext.fillStyle = color
    canvasContext.fillRect(x, y, width, height)
}
