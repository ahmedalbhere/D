let player = document.getElementById("player");
let doll = document.getElementById("doll");
let signal = document.getElementById("signal");
let message = document.getElementById("message");
let timerDisplay = document.getElementById("timer");

let gameRunning = true;
let signalGreen = true;
let position = 50;
let timeLeft = 240;

function updateSignal() {
  signalGreen = Math.random() > 0.5;
  signal.textContent = signalGreen ? "🟢" : "🔴";
  doll.style.transform = signalGreen
    ? "translateX(-50%) rotate(0deg)"
    : "translateX(-50%) rotate(180deg)";
}

function checkMovement() {
  if (!signalGreen && isMoving) {
    gameOver("تم قتلك ⚰️");
  }
}

function gameOver(msg) {
  gameRunning = false;
  message.style.display = "block";
  message.textContent = msg;
}

let isMoving = false;

document.body.addEventListener("touchstart", () => {
  isMoving = true;
});

document.body.addEventListener("touchend", () => {
  isMoving = false;
});

document.body.addEventListener("mousedown", () => {
  isMoving = true;
});

document.body.addEventListener("mouseup", () => {
  isMoving = false;
});

function gameLoop() {
  if (!gameRunning) return;

  if (isMoving) {
    position += 1;
    player.style.left = position + "%";
    checkMovement();
    if (position >= 95) {
      gameOver("فزت 🎉");
    }
  }

  requestAnimationFrame(gameLoop);
}

function startTimer() {
  let interval = setInterval(() => {
    if (!gameRunning) {
      clearInterval(interval);
      return;
    }

    timeLeft--;
    timerDisplay.textContent = timeLeft;

    if (timeLeft <= 0) {
      gameOver("انتهى الوقت ⏰");
    }
  }, 1000);
}

setInterval(() => {
  if (gameRunning) updateSignal();
}, 2000 + Math.random() * 2000);

updateSignal();
startTimer();
gameLoop();
