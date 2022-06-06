/*************************************************************/
// Game Two Code
// Click Circles
/*************************************************************/
// circle array
var circles = [];
var circleSize = 40;

// amount of circles to begin with
var spawnCircle = 3;

// getting circle radius
var circleRadius = 20;

// score
var scoreCircle = 0;
var missCount = 0;
var hit = false;
var distFromBall = [];

/*************************************************************/
// score function
/*************************************************************/
function scoreFun() {
  // measure distance from mouse to ball
  for (i = 0; i < circles.length; i++) {
    distFromBall[i] = dist(circles[i].x, circles[i].y, mouseX, mouseY);
  }

  // document.getElementById("p_score").innerHTML = "Score: " + score;
  // document.getElementById("p_missCount").innerHTML = "Misses: " + missCount;
  console.log("Score: " + score);
  console.log("Misses: " + missCount);
}

/*************************************************************/
// create circle function
/*************************************************************/
function createCircle() {

  for (var i = 0; i < spawnCircle; i++) {
    circles[i] = {
      // properties
      
      x: random(30, elmnt.offsetWidth - 30),
      y: random(30, elmnt.offsetHeight - 30),
      speedX: random(-5, 5),
      speedY: random(-5, 5),

      // functions
      display: function() {
        // displaying the circle
        //fill(col.r, col.g, col.b);
        fill(255);
        ellipse(this.x, this.y, circleSize, circleSize);
      },

      move: function() {
        // making it move
        this.x = this.x + this.speedX;
        this.y = this.y + this.speedY;
      },

      bounce: function() {
        // making it bounce
        if (this.x > canvWidth - circleRadius || this.x < circleRadius) {
          this.speedX = this.speedX * -1;
        }

        if (this.y > canvHeight - circleRadius || this.y < circleRadius) {
          this.speedY = this.speedY * -1;
        }

        // constraining it from leaving canvas
        this.x = constrain(this.x, circleRadius, canvWidth - circleRadius);
        this.y = constrain(this.y, circleRadius, canvHeight - circleRadius);
      }
    };
  }

  spawnCircle = 0;
}

/*************************************************************/
// draw circle function
/*************************************************************/
function drawCircles() {
  for (var i = 0; i < circles.length; i++) {
    circles[i].display();
    circles[i].move();
    circles[i].bounce();
  }
}

/*************************************************************/
// timer function
/*************************************************************/
// function timeCounter() {
//   // updating timer
//   document.getElementById("p_timer").innerHTML = "Timer: " + counter;
//   // time counter
//   counter++;

//   // stopping timer
//   if (counter >= 6) {
//     stopTimer();
//     counter = 0;
//     // updating task name
//     document.getElementById("h_taskName").innerHTML = TASKNAME + " (Finished)";
//   }
// }

/*************************************************************/
// start timer function
/*************************************************************/
// function startTimer() {
//   interval = setInterval(timeCounter, 1000);
//   // updating task name
//   document.getElementById("h_taskName").innerHTML = TASKNAME + " (Running)";

//   // resetting timer every time user clicks start again
//   if (counter > 0 && button.mousePressed) {
//     counter = 0;
//     stopTimer();
//   }
// }

// /*************************************************************/
// // stop timer function
// /*************************************************************/
// function stopTimer() {
//   clearInterval(interval);
// }

/*************************************************************/
// mouse click on canvas function
/*************************************************************/
function canvasClicked() {
  // running score function
  scoreFun();
  // checks if user hit any circles
  for (var i = 0; i < circles.length; i++) {
    if (distFromBall[i] <= circleRadius) {
      // replace their position
      circles[i].x = random(20, 380);
      circles[i].y = random(20, 380);
    }
  }

  // changing score
  hit = distFromBall.some(function(e) {
    return e <= circleRadius;
  });

  if (hit === true) {
    // increase score if hit
    score += 1;
  } 
  
  else {
    // increase misses if not hit
    missCount += 1;
  }

}

/*************************************************************/
//      END OF GAME ONE
/*************************************************************/