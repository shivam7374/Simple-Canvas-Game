let paintbox = document.getElementById('paintbox')
let context = paintbox.getContext('2d')
let score=0
let gameOn = true
let flag=0
let playerSpeed = 5


class Box {
  constructor(size, color) {
    this.size = size
    this.color = color
    this.x = 0
    this.y = 0
  }
}

class Player extends Box {
  constructor() {
    super(50, 'green')
    this.x = 350
    this.y = 150
    this.speed = 0
  }
  move() {
    this.y -= this.speed
    if (this.y + this.size > 200) {
      this.speed = Math.abs(this.speed)
      flag=0
    }
    if (this.y < 0) {
      this.speed = -Math.abs(this.speed)
      score+=10
      flag=1
    } 
  }
}

class Enemy1 extends Box {
  constructor(speed,size) {
    super(size, 'red')
    this.speed = speed
  }

  move() {
    this.x += this.speed
    if (this.x + this.size > 800) {
      this.speed = -Math.abs(this.speed)
    }
    if (this.x < -100) {
      this.speed = Math.abs(this.speed)
    }
  }
}

let player = new Player()
let e1 = new Enemy1(1,50)
let e2 = new Enemy1(2,30)
let e3 = new Enemy1(-1,40)
e1.y = 100
e2.y = 100
e3.y = 100
let e4 = new Enemy1(2,30)
let e5 = new Enemy1(3,20)
e4.y = 0
e5.y = 60
let e6 = new Enemy1(-5,20)
e6.y = 40
e6.x=900
let e7 = new Enemy1(8,10)
e7.y = 100
e7.x=900
let e8 = new Enemy1(-5,25)
e8.y = 120
e8.x=1200


function isCollided(box1, box2) {

  var playerleft = box2.x;
  var playerright = box2.x + (box2.size);
  var playertop = box2.y;
  var playerbottom = box2.y + (box2.size);
  var enemyleft = box1.x;
  var enemyright = box1.x + (box1.size);
  var enemytop = box1.y;
  var enemybottom = box1.y + (box1.size);
  var crash = true;
  if ((playerbottom < enemytop) ||
  (playertop > enemybottom) ||
  (playerright < enemyleft) ||
  (playerleft > enemyright)) {


    crash = false;
  }

  return crash;
  
    
}

function drawBox(box) {
  context.fillStyle = box.color
  context.fillRect(box.x, box.y, box.size, box.size)
}

paintbox.addEventListener('mousedown', () => {
  if(flag==0)
  {
  player.speed = playerSpeed
  }
  else{
    player.speed = -playerSpeed
  }
})

paintbox.addEventListener('mouseup', () => {
  player.speed = 0
})


function gameLoop() {
  if (!gameOn) return  
  console.log('frame update')
  context.clearRect(0, 0, 700, 200)
  console.log("Score : "+score)
  
document.getElementById("demo").innerHTML =score;
  if(score<50)
  {
  e1.move()
  e2.move()
  e3.move()
  player.move()
  drawBox(player)
  drawBox(e1)
  drawBox(e2)
  drawBox(e3)
  }
  else if(score<=100)
  {
  e4.move()
  e2.move()
  e5.move()
  e8.move()
  player.move()
  drawBox(player)
  drawBox(e4)
  drawBox(e8)
  drawBox(e2)
  drawBox(e5)
  }
  else if(score>100)
  {
  e4.move()
  e2.move()
  e5.move()
  player.move()
  drawBox(player)
  drawBox(e4)
  drawBox(e2)
  drawBox(e5)
  drawBox(e1)
  drawBox(e6)
  drawBox(e7)
  e1.move()
  e6.move()
  e7.move()
}
  if (isCollided(e1, player) || isCollided(e2, player) || isCollided(e3, player) || isCollided(e4, player) || isCollided(e5, player) || isCollided(e6, player) || isCollided(e7, player) || isCollided(e8, player) ) {
    gameOn = false  
    window.alert('Game Over')
  }
  window.requestAnimationFrame(gameLoop)
}

gameLoop()
