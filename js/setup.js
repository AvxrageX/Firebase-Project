/*************************************************************/
// Setup Code
/*************************************************************/
// Parent container
var elmnt = document.getElementById("canvasContainer");
var canvWidth = elmnt.offsetWidth;
var canvHeight = elmnt.offsetHeight;

// Selected game
const selectedGame = document.getElementById("gameTitle");
var runningGame = "Game One"

// Game constants
const gameOne = "Game #01";
const gameTwo = "Game #02";
const gameThree = "Game #03";

/*************************************************************/
// setup function
/*************************************************************/
function setup() {
  frameRate(60);

  var elmnt = document.getElementById("canvasContainer");
  console.log("Width/height " + elmnt.offsetWidth + "/" + elmnt.offsetHeight)


  playArea = createCanvas(elmnt.offsetWidth, elmnt.offsetHeight);
  playArea.parent("canvasContainer");

  // Making canvas hidden at start
  resizeCanvas(0, 0);
}

/*************************************************************/
// draw function
/*************************************************************/
function draw() {
  // Background colour
  background(136, 232, 135);

  // Running the selected game
  chooseGame();
}

/*************************************************************/
// start game function
/*************************************************************/
function startGame() {
  // Resize canvas
  resizeCanvas(elmnt.offsetWidth, elmnt.offsetHeight);

  // Telling what game is running
  console.log("Running: " + runningGame);

  // Creating circles
  createCircle();

  // Move apple
  moveApple();
  snake.speedX = 1;
  snake.speedY = 0;
}

/*************************************************************/
// stop game function
/*************************************************************/
function stopGame() {
  console.log("Stopped: " + runningGame);
  
  // Removing canvas
  resizeCanvas(0, 0);

  // Reposition snake (game one)
  snake.x = canvWidth/2;
  snake.y = canvHeight/2;
  snake.sizeTotal = 1;
  snake.tail = [];

  // Reposition Circles (game two)
  for (var i = 0; i < circles.length; i++) {
    circles[i].x = random(circleRadius, elmnt.offsetWidth - circleRadius);
    circles[i].y = random(circleRadius, elmnt.offsetHeight - circleRadius);
    circles[i].speedX = random(-5, 5);
    circles[i].speedY = random(-5, 5);
  }
}

/*****************************************************/
// startButton()
/*****************************************************/
function startButton() {
  const startBtn = document.getElementById("startButton");

  if (startBtn.innerText === "Start") {
    startGame();
    startBtn.innerText = "Stop";
    // startBtn.classList.add("w3-hover-red");
    // startBtn.classList.remove("w3-hover-green");
  } else if (startBtn.innerText === "Stop") {
    stopGame();
    startBtn.innerText = "Start";
    // startBtn.classList.add("w3-hover-green");
    // startBtn.classList.remove("w3-hover-red");
  }

}

/*****************************************************/
// Game title function
/*****************************************************/
function gameTitle(_title) {
  selectedGame.innerText = _title;
  console.log("Selected " + _title);
  
  // Making canvas hidden when games changed
  resizeCanvas(0, 0);

  // Resetting start button, and stopping running game
  stopGame();
  document.getElementById("startButton").innerText = "Start";
}

/*****************************************************/
// Choose game function
/*****************************************************/
function chooseGame() {

  if (selectedGame.innerText === gameOne) {
    runningGame = gameOne;

    drawSnake();
    frameRate(10);
  }

  else if (selectedGame.innerText === gameTwo) {
    runningGame = gameTwo;
    
    drawCircles();
    playArea.mouseClicked(canvasClicked);
    // Resetting framerate
    frameRate(60);
  }

  else if (selectedGame.innerText === gameThree) {
    runningGame = gameThree;
    // Resetting framerate
    frameRate(60);
  }
  
}