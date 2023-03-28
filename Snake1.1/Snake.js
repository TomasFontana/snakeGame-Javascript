const canvas = document.getElementById("snakeCanvas");
const ctx = canvas.getContext("2d");

const box = 16;
const width = canvas.width - 2*box;
const height = canvas.height - 2*box;

let snake = {
  x: box * 5,
  y: box * 5,
  length: 5,
  direction: "right",
  segments: []
};

function drawBoard() {
  ctx.fillStyle = "#2c6e7c";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#0f4c5c";
  ctx.fillRect(box, box, width, height);

  ctx.strokeStyle = "#00bfff";
  ctx.lineWidth = box/8;
  ctx.strokeRect(box-box/16, box-box/16, width+box/8, height+box/8);

  ctx.strokeStyle = "#000000";
  ctx.lineWidth = box/4;
  ctx.strokeRect(box+box/8, box+box/8, width-box/4, height-box/4);

  ctx.strokeStyle = "#00bfff";
  ctx.lineWidth = box/8;
  ctx.beginPath();
  ctx.moveTo(box-box/16, box-box/16);
  ctx.lineTo(width+box/16, box-box/16);
  ctx.stroke();
}

function drawSnake() {
  for (let i = snake.segments.length - 1; i >= 0; i--) {
    let segment = snake.segments[i];

    ctx.fillStyle = i === snake.segments.length - 1 ? "#000000" : "#11ff00";
    ctx.fillRect(segment.x, segment.y, box, box);
    ctx.strokeStyle = "#000000"; // Establece el color del borde
    ctx.strokeRect(segment.x, segment.y, box, box); // Dibuja el cuadrado con borde
    ctx.lineWidth = 0.5; // Establece el grosor del borde a 2 píxeles
ctx.strokeRect(segment.x, segment.y, box, box); // Dibuja el cuadrado con borde

  }
}



function moveSnake() {
  let head = { x: snake.x, y: snake.y };
  snake.segments.push(head);
  if (snake.segments.length > snake.length) {
    snake.segments.shift();
  }

  if (snake.direction === "right") {
    snake.x += box;
  } else if (snake.direction === "left") {
    snake.x -= box;
  } else if (snake.direction === "up") {
    snake.y -= box;
  } else if (snake.direction === "down") {
    snake.y += box;
  }
}

function generateFood() {
    let food = {
      x: Math.floor(Math.random() * (width/box)) * box + box,
      y: Math.floor(Math.random() * (height/box)) * box + box
    };
    return food;
  }
  
  let food = generateFood();
  
  function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);
  }
  
  function checkCollision() {
    if (snake.x < box || snake.x > width || snake.y < box || snake.y > height) {
      return true;
    }
    for (let i = 0; i < snake.segments.length; i++) {
      if (snake.x === snake.segments[i].x && snake.y === snake.segments[i].y) {
        return true;
      }
    }
    return false;
  }
  
  function update() {
    if (checkCollision()) {
      clearInterval(game);
    }
  
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    drawBoard();
    drawSnake();
    drawFood();
  
    if (snake.x === food.x && snake.y === food.y) {
      snake.length++;
      food = generateFood();
    }
  
    moveSnake();
  }
  
  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight" && snake.direction !== "left") {
      snake.direction = "right";
    } else if (event.key === "ArrowLeft" && snake.direction !== "right") {
      snake.direction = "left";
    } else if (event.key === "ArrowUp" && snake.direction !== "down") {
      snake.direction = "up";
    } else if (event.key === "ArrowDown" && snake.direction !== "up") {
      snake.direction = "down";
    }
  });
  
  let game = setInterval(update, 100);
  
  const resetButton = document.getElementById("resetButton");

resetButton.addEventListener("click", function() {
  location.reload();
});

const scoreDisplay = document.getElementById("score");
let score = 0;

function drawScore() {
  scoreDisplay.innerHTML = "Score: " + score;
}

function increaseScore() {
  score += 10;
}

function update() {
  if (checkCollision()) {
    clearInterval(game);
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBoard();
  drawSnake();
  drawFood();

  if (snake.x === food.x && snake.y === food.y) {
    snake.length++;
    increaseScore();
    food = generateFood();
  }

  moveSnake();
  drawScore();
}

// Función para comprobar si el valor del highscore existe en localStorage
function checkHighScore() {
    if (!localStorage.getItem("highscore")) {
      localStorage.setItem("highscore", 0);
    }
  }
  
  // Comprobar el highscore existente en localStorage
  checkHighScore();
  
  // Función para actualizar el highscore si es superado
  function updateHighScore() {
    if (score > localStorage.getItem("highscore")) {
      localStorage.setItem("highscore", score);
    }
  }
  
  // Función para mostrar el highscore en el elemento del HTML
  function showHighScore() {
    const highscoreDisplay = document.getElementById("highscore");
    const highscore = localStorage.getItem("highscore");
    highscoreDisplay.innerHTML = "Highscore: " + highscore;
  }
  
  // Función para incrementar el score y actualizar su valor en el HTML
  function increaseScore() {
    score++;
    document.getElementById("score").innerHTML = "Score: " + score;
  }
  
  // Función para reiniciar el juego, actualizar el highscore y mostrarlo
  function resetGame() {
    score = 0;
    document.getElementById("score").innerHTML = "Score: " + score;
    updateHighScore();
    showHighScore();
  }
  function increaseScore() {
    score++;
    document.getElementById("score").innerHTML = "Score: " + score;
    updateHighScore(); // actualizar highscore después de aumentar el puntaje
  }
  function showHighScore() {
    const highscoreDisplay = document.getElementById("highscore");
    const highscore = localStorage.getItem("highscore");
    highscoreDisplay.innerHTML = "Highscore: " + highscore;
  }
  
  showHighScore();
  
  