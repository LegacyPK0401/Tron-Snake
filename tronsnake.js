class TronCycle {
  constructor(x, y, size) {
    this.x = x
    this.y = y
    this.size = size
    this.tail = [{x:this.x, y:this.y}]
    this.rotateX = 0
    this.rotateY = 1

  }

  move() {
    var newRect;
    if (this.rotateX == 1) {
      newRect = {
        x: this.tail[this.tail.length - 1].x + this.size,
        y: this.tail[this.tail.length - 1].y
      }
    } else if (this.rotateX == -1) {
      newRect = {
        x: this.tail[this.tail.length - 1].x - this.size,
        y: this.tail[this.tail.length - 1].y
      }
    } else if (this.rotateY == 1) {
      newRect = {
        x: this.tail[this.tail.length - 1].x,
        y: this.tail[this.tail.length - 1].y + this.size
      }
    } else if (this.rotateY == -1) {
      newRect = {
        x: this.tail[this.tail.length - 1].x,
        y: this.tail[this.tail.length - 1].y - this.size
      }
    }

    this.tail.shift()
    this.tail.push(newRect)
  }
}




class IdenDisc{
  constructor(){
    console.log("light")
    console.log(tron.size)
    var isTouching;
    while(true){
      isTouching = false;
      this.x = Math.floor(Math.random() * canvas.width / tron.size) * tron.size
      this.y = Math.floor(Math.random() * canvas.height / tron.size) * tron.size
      for (var i = 0; i < tron.tail.length; i++) {
        if (this.x == tron.tail[i].x && this.y == tron.tail[i].y) {
          isTouching = true
        }
      }
      console.log(this.x, this.y)
      this.color = "orange"
      this.size = tron.size
      if (!isTouching) {
        break;
      }
      
      
    }
  }
}

var canvas = document.getElementById("canvas")

var tron = new TronCycle(20,20,20);

var light = new IdenDisc();

var canvasContext = canvas.getContext('2d');

window.onload = ()=>{
  gameLoop();
}

function gameLoop() {
  setInterval(show, 1000 / 15) // here 15 is our fps value
}

function show() {
  update();
  draw();
}

function update() {
  canvasContext.clearRect(0,0 , canvas.width, canvas.height)
  console.log("update")
  tron.move()
  eatIdenDisc()
  checkHitWall()
}

function checkHitWall(){
  var headTail = tron.tail[tron.tail.length -1]
  if(headTail.x == - tron.size) {
    headTail.x = canvas.width - tron.size
  } else if(headTail.x == canvas.width) {
    headTail.x = 0
  } else if(headTail.y == - tron.size) {
    headTail.y = canvas.height - tron.size
  } else if(headTail.y == canvas.height) {
    headTail.y = 0
  }
}

function eatIdenDisc(){
  if(tron.tail[tron.tail.length - 1].x == light.x &&
      tron.tail[tron.tail.length - 1].y == light.y){
        tron.tail[tron.tail.length] = {x:light.x, y: light.y}
        light = new IdenDisc();
      }
}

function draw() {
  createRect(0, 0, canvas.width, canvas.height, "black")
  createRect(0, 0, canvas.width, canvas.height)
  for (var i =0; i < tron.tail.length; i++) {
    createRect(tron.tail[i].x + 2.5, tron.tail[i].y + 2.5, 
      tron.size - 5, tron.size- 5, 'teal')
    }

  canvasContext.font = "20px Arial"
  canvasContext.fillStyle = "#00FF42"
  canvasContext.fillText("Score: " + (tron.tail.length + 1), canvas.width - 120, 18);
  createRect(light.x, light.y, light.size , light.size, light.color)
}

function createRect(x, y, width, height, color){
  canvasContext.fillStyle = color
  canvasContext.fillRect(x, y, width, height)
}

window.addEventListener("keydown", (event)=>{
  setTimeout(()=>{
    if(event.keyCode == 37 && tron.rotateX != 1){
      tron.rotateX = -1
      tron.rotateY = 0;
    } else if(event.keyCode == 38 && tron.rotateY != 1){
      tron.rotateX = 0
      tron.rotateY = -1;
    } else if(event.keyCode == 39 && tron.rotateX != -1){
      tron.rotateX = 1
      tron.rotateY = 0;
    } else if(event.keyCode == 40 && tron.rotateY != -1){
      tron.rotateX = 0
      tron.rotateY = 1;
    }
  })
})
