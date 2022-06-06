/*************************************************************/
// Game One Code
// Snake Game
/*************************************************************/
const spawnSnake = 1;
const snakeSize = 30;
var scoreSnake = 0;
const spawnWidth = canvWidth - 40
const spawnHeight = canvHeight - 40;
var w;
var h;

var apple = {
  // properties
  x: 0,
  y: 0,

  // functions
  display: function() {
    fill(255, 56, 83);
    rect(this.x, this.y, snakeSize, snakeSize);
  }
}

var snake = {
  // properties
  x: canvWidth/2,
  y: canvHeight/2,
  speedX: 0,
  speedY: 0,
  sizeTotal: 1,
  tail: [],

  // functions
  move: function() {
    // Increase the size of the snake when apple is eaten
    if (this.sizeTotal === this.tail.length) {
      for (var i = 0; i < this.tail.length-1; i++) {
        this.tail[i] = this.tail[i+1];
      }
    }

    this.tail[this.sizeTotal-1] = createVector(this.x, this.y);
    
    // Making snake move at the same scale as it's size
    // so it is in a grid
    this.x = this.x + this.speedX*snakeSize;
    this.y = this.y + this.speedY*snakeSize;
    // Constraining the snake
    this.x = constrain(this.x, 0, canvWidth - snakeSize);
    this.y = constrain(this.y, 0, canvHeight - snakeSize);
  },

  display: function() {
    fill(53, 139, 240);
    // adding length to snake
    for (var i = 0; i < this.tail.length; i++) {
      rect(this.tail[i].x, this.tail[i].y, snakeSize, snakeSize);
    }
    
    rect(this.x, this.y, snakeSize, snakeSize);;
  },
    
  dir: function(x, y) {
    // direction the snake is going
    this.speedX = x;
    this.speedY = y;
  },

  eat: function(pos) {
    // If distance from apple is close enough, snake size is increased
    var distFromApple = dist(this.x, this.y, pos.x, pos.y);
    if (distFromApple < snakeSize) {
      this.sizeTotal++;
      scoreSnake = scoreSnake + 1;
      console.log("Score: " + scoreSnake);
      return true;
    }

    else {
      return false;
    }
  },

  death: function() {
    // If the snake interacts with any of it's tail
    // Reset it
    for (var i = 0; i < this.tail.length; i++) {
      var pos = this.tail[i];
      var distFromSnake = dist(this.x, this.y, pos.x, pos.y);

      if (distFromSnake < snakeSize) {
        // Write score after death if highscore
        console.log("Writing score: " + scoreSnake);
        firebase.database().ref("userDetails/" + userDetails.uid + "/Public/Scores/Snake").set(scoreSnake);
        
        this.sizeTotal = 0;
        scoreSnake = 0;
        this.tail = [];
        this.x = canvWidth/2;
        this.y = canvHeight/2;
        console.log("You Died!")

        }
      }
    }
    
  

};

/*************************************************************/
// draw snake game function
/*************************************************************/
function drawSnake() {
  snake.death();
  snake.move();
  snake.display();
  
  apple.display();
  
  if (snake.eat(apple)) {
    moveApple();
  }
}

/*************************************************************/
// movement key function
/*************************************************************/
function keyPressed() {
  if (keyCode === UP_ARROW && snake.speedY != 1) {
    // go up
    snake.dir(0, -1);

  }

  else if (keyCode === DOWN_ARROW && snake.speedY != -1) {
    // go down
    snake.dir(0, 1);
  }

  else if (keyCode === RIGHT_ARROW && snake.speedX != -1) {
    // go right
    snake.dir(1, 0);
  }

  else if (keyCode === LEFT_ARROW && snake.speedX != 1) {
    // go left
    snake.dir(-1, 0);
  }
}

/*************************************************************/
// move apple function
/*************************************************************/
function moveApple() {
  // positions for the apple to spawn in
  // var cols = Math.floor(Math.random() * ((canvWidth - 40) - 40) + 40);
  // var rows = Math.floor(Math.random() * ((canvHeight - 40) - 40) + 40);

  var cols = floor(canvWidth/snakeSize);
  var rows = floor(canvHeight/snakeSize);
  
  apple.x = floor(random(cols));
  apple.y = floor(random(rows));
  
  apple.x = apple.x*snakeSize - 20;
  apple.y = apple.y*snakeSize - 25;

  for (var i = 0; i < snake.tail.length; i++) {
    var tailPos = snake.tail[i];
    var distFromTail = dist(apple.x, apple.y, tailPos.x, tailPos.y);

    if (distFromTail < snakeSize) {
      moveApple();
    }
  }

  if (apple.x > spawnWidth || apple.x < 40) {
    moveApple();
  }

  else if (apple.y > spawnHeight || apple.y < 40) {
    moveApple();
  }
}

