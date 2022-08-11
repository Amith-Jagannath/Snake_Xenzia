let inputDir = { x: 0, y: 0 };
const foodSound = new Audio("food.mp3");
const gameOverSound = new Audio("gameOver.mp3");
const moveSound = new Audio("move.mp3");
const musicSound = new Audio("music.mp3");
const value = document.querySelector("#score");
const high = document.querySelector("#highScore");
high.innerText = "Highest:0";
value.innerText = "Score:0";
let speed = 10;
let a = 2;
let b = 16;
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }];
let food = { x: 6, y: 5 };
let score = 0;
let highScore = 0;
const board = document.getElementById("board");
function main(ctime) {
  window.requestAnimationFrame(main);

  if ((ctime - lastPaintTime) / 1000 < 1 / speed) return;
  //   console.log(ctime);
  lastPaintTime = ctime;
  gameEngine();
}

window.requestAnimationFrame(main);

function isCollide(snake) {
  //   if you bump into yourself
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y == snake[0].y) return true;
  }
  if (snake[0].x > 18 || snake[0].x < 0 || snake[0].y > 18 || snake[0].y < 0)
    return true;

  return false;
}

function gameEngine() {
  //updating the snake
  //display the snake
  //display food

  if (isCollide(snakeArr)) {
    moveSound.pause();
    gameOverSound.play();
    inputDir = { x: 0, y: 0 };
    alert("Gameover");
    snakeArr = [{ x: 13, y: 15 }];
    musicSound.play();
    high.innerText = "Highest:" + highScore;
    score = 0;
    value.innerText = "Score:" + score;
  }
  //if have eaten the food increase the size
  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    foodSound.play();
    snakeArr.unshift({
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.y,
    });
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
    score++;
    highScore = score;
    value.innerText = "Score:" + score;
  }

  //moving the snake
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }
  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;

  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if (index === 0) snakeElement.classList.add("snakeHead");
    else snakeElement.classList.add("snake");
    board.appendChild(snakeElement);
  });

  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}
//main
window.addEventListener("keydown", (e) => {
  moveSound.play();
  inputDir = { x: 0, y: 0 };
  switch (e.key) {
    case "ArrowDown":
      console.log("arrowDown");
      inputDir.x = 0;
      inputDir.y = 1;
      break;
    case "ArrowUp":
      console.log("arrowUp");
      inputDir.x = 0;
      inputDir.y = -1;
      break;
    case "ArrowLeft":
      console.log("arrowLeft");
      inputDir.x = -1;
      inputDir.y = 0;
      break;
    case "ArrowRight":
      console.log("arrowRight");
      inputDir.x = 1;
      inputDir.y = 0;
      break;
    default:
      break;
  }
});
