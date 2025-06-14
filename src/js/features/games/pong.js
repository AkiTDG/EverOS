//pingpong variables for key controls, game logic and scoring
export let playerScore = 0
export let aiScore = 0
export let gameEnded = false
export let ponghasStart = false
let keydownHandler, keyupHandler
let pingPongAnimationId, pingPongLoop
let aiCanMove = true
let aiLastToggle = performance.now()
let aiToggleDuration = 3000 + Math.random() * 3000
let aiDirection = 1
let pongKeyStartListener = null
let pongTouchStartListener = null
//main menu/UI
export const pingpongUI = `<pre id="pongUI" style="font-family: monospace; color: lime; background: black;">
╔───────────────────────────────────────────────────────────╗
│__________.__              __________                      │
│\\______   \\__| ____    ____\\______   \\____   ____    ____  │
│ |     ___/  |/    \\  / ___\\|     ___/  _ \\ /    \\  / ___\\ │
│ |    |   |  |   |  \\/ /_/  >    |  (  <_> )   |  \\/ /_/  >│
│ |____|   |__|___|  /\___   /|____|   \\____/|___|  /\\___  / │
│                  \\//_____/                     \\//_____/  │
╚───────────────────────────────────────────────────────────╝
+-----------------------------------------------------------+
|===========================================================|
| Player vs AI | First to Score 20 Wins                     |
|                                                           |
| Controls:                                                 |
|  Arrows ↑ & ↓ to Move       (Desktop)                     |
|  Hover paddle               (Mobile)                      |
|                                                           |
| Press any key   (PC) or                                   |
| Tap the console (Mobile) to begin the game                |
|===========================================================|
+-----------------------------------------------------------+
</pre>`

export function pongInit() {
  const consoleDiv = document.getElementById("console")
  consoleDiv.innerHTML = pingpongUI

  ponghasStart = true

  setTimeout(() => {
    function startGame(e) {
      e?.preventDefault?.()
      e?.stopPropagation?.()

      ponghasStart = false
      cleanupPingPong()
      PingPong()
    }

    pongKeyStartListener = startGame
    pongTouchStartListener = startGame

    document.addEventListener("keydown", pongKeyStartListener, { once: true })
    consoleDiv.addEventListener("touchstart", pongTouchStartListener, { once: true })
  }, 100)
}

//used to patch pingpong's buggy home screen after play
export function cleanupPingPong() {
  const canvas = document.getElementById("pongCanvas")
  if (canvas?.parentNode) canvas.remove()
  const style = document.getElementById("pong-style")
  if (style) style.remove()
  const pongUI = document.getElementById('pongUI')
  if (pongUI) pongUI.remove()
  const consoleDiv = document.getElementById("console")
  if (pongKeyStartListener) {
    document.removeEventListener("keydown", pongKeyStartListener)
    pongKeyStartListener = null
  }
  if (pongTouchStartListener) {
    consoleDiv.removeEventListener("touchstart", pongTouchStartListener)
    pongTouchStartListener = null
  }
  if (keydownHandler) document.removeEventListener("keydown", keydownHandler)
  if (keyupHandler) document.removeEventListener("keyup", keyupHandler)
  if (pingPongAnimationId) cancelAnimationFrame(pingPongAnimationId)
  if (pingPongLoop) clearInterval(pingPongLoop)
  ponghasStart = false
  playerScore = 0
  aiScore = 0
}

//game over card,plus screen patch
export function endGame() {
    if (gameEnded) return 
    gameEnded=true
    const score = `Final Score: Player ${playerScore} - ${aiScore} COM`.padEnd(51)
    const gameOverScreen = `
╔───────────────────────────────────────────────────────────╗
│__________.__              __________                      │
│\\______   \\__| ____    ____\\______   \\____   ____    ____  │
│ |     ___/  |/    \\  / ___\\|     ___/  _ \\ /    \\  / ___\\ │
│ |    |   |  |   |  \\/ /_/  >    |  (  <_> )   |  \\/ /_/  >│
│ |____|   |__|___|  /\___   /|____|   \\____/|___|  /\\___  / │
│                  \\//_____/                     \\//_____/  │
╚───────────────────────────────────────────────────────────╝
+----------------------------------------------------+
|===================[ GAME OVER ]====================|
|                                                    |
|${score}|
|Play again?      [Type 'nav pong']                  |
|Return home?     [Type 'nav home']                  |
|====================================================|
+----------------------------------------------------+`
    writeToConsole(gameOverScreen)
    cleanupPingPong()
  }
//game's whole logic
export function PingPong() {
  playerScore = 0
  aiScore = 0
  gameEnded = false
//in-game screen
  const consoleDiv = document.getElementById("console")
  consoleDiv.innerHTML = `<canvas id="pongCanvas" width="525" height="400"></canvas>`
  const style = document.createElement("style")
  style.id = "pong-style"
  style.textContent = `
    #console {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 585px;
      height: 450px;
    }
    canvas {
      display: block;
      margin: 0 auto;
      background: #000;
      border: 2px solid lime;
      border-radius: 12px;
      touch-action: none;
    }
  `
  document.head.appendChild(style)
//game's touch control support for mobile users
  const canvas = document.getElementById("pongCanvas")
  canvas.addEventListener("touchmove", e => {
  e.preventDefault()
  const touch = e.touches[0]
  const rect = canvas.getBoundingClientRect()
  const y = touch.clientY - rect.top
  playerY = y - paddleHeight / 2
  if (playerY < 0) playerY = 0
  if (playerY + paddleHeight > canvas.height) playerY = canvas.height - paddleHeight
  }, 
  { passive: false })
  const ctx = canvas.getContext("2d")
//in-game constants
  const paddleHeight = 80
  const paddleWidth = 10
  const paddleOffset = 15
  const ballSize = 20
  const maxScore = 20
//in-game sprites/logic
  let playerY = canvas.height / 2 - paddleHeight / 2
  let aiY = canvas.height / 2 - paddleHeight / 2
  let ballX = canvas.width / 2
  let ballY = canvas.height / 2
  let ballSpeedX = 3
  let ballSpeedY = 3
  let ballmvntInterval = 0  
  let upPressed = false
  let downPressed = false
  let aiTrackBallNextPlay = false
  let aiZoomNextPlay = false
  let aiStartedAt = performance.now()
  let aiGracePeriod = 3000

//key control logic
  keydownHandler = function (e) {
  if (e.key === "ArrowUp") upPressed = true
  if (e.key === "ArrowDown") downPressed = true
  if (e.key === "End") {
    e.preventDefault()
    e.stopPropagation()
    endGame()
  }
  if (["Home", "Delete"].includes(e.key)) {
    e.preventDefault()
    e.stopPropagation()
  }
}

  keyupHandler = function(e) {
    if (e.key === "ArrowUp") upPressed = false
    if (e.key === "ArrowDown") downPressed = false
  }
  document.addEventListener("keydown", keydownHandler)
  document.addEventListener("keyup", keyupHandler)
//in-game sprite's appearance and logic functiona
  function drawPaddle(x, y) {
    ctx.fillStyle = "#fff"
    ctx.fillRect(x, y, paddleWidth, paddleHeight)
  }
  function drawBall() {
    ctx.fillStyle = "lime"
    ctx.beginPath()
    ctx.arc(ballX + ballSize / 2, ballY + ballSize / 2, ballSize / 2, 0, Math.PI * 2)
    ctx.fill()
  }
  function drawNet() {
    ctx.setLineDash([10, 10])
    ctx.strokeStyle = "#d3d3d3"
    ctx.beginPath()
    ctx.moveTo(canvas.width / 2, 0)
    ctx.lineTo(canvas.width / 2, canvas.height)
    ctx.stroke()
    ctx.setLineDash([])
  }
  function drawScore() {
    ctx.font = "20px Arial"
    ctx.fillStyle = "#d3d3d3"
    ctx.fillText(playerScore, canvas.width / 4, 30)
    ctx.fillText(aiScore, (3 * canvas.width) / 4, 30)
  }
//AI opponent's movement logic
  function moveAI() {
  const now = performance.now();
  if (now - aiStartedAt >= aiGracePeriod) {
    if (now - aiLastToggle >= aiToggleDuration) {
      aiCanMove = !aiCanMove;
      aiLastToggle = now;
      aiToggleDuration = aiCanMove
        ? 3000 + Math.random() * 3000
        : 800 + Math.random() * 800
    }
  } 
  else {aiCanMove = true}

  if (aiCanMove) {
    if (aiTrackBallNextPlay) {
      const paddleCenter = aiY + paddleHeight / 2
      const ballCenter = ballY + ballSize / 2
      const trackingSpeed = aiZoomNextPlay ? 6 : 4
      if (ballCenter > paddleCenter) {aiY += trackingSpeed} 
      else if (ballCenter < paddleCenter) {aiY -= trackingSpeed}
    } 
    else {
      const baseSpeed = 2;
      const moveSpeed = aiZoomNextPlay ? baseSpeed * 2 : baseSpeed;
      aiY += moveSpeed * aiDirection;
    }
    if (aiY <= 0) {
      aiY = 0;
      aiDirection = 1;
    } 
    else if (aiY + paddleHeight >= canvas.height) {
      aiY = canvas.height - paddleHeight;
      aiDirection = -1;
    }
  }
}
//ball's direction after neither player scores
  function resetBall(direction = 1) {
    ballX = canvas.width / 2 - ballSize / 2
    ballY = canvas.height / 2 - ballSize / 2
    ballSpeedX = direction * 3
    ballSpeedY = 2 * (Math.random() > 0.5 ? 1 : -1)
    aiTrackBallNextPlay = Math.random() < 0.30
    aiZoomNextPlay = Math.random() < 0.40
  }
//collision logic with the paddle
  function checkCollision() {
    if (
      ballX <= paddleOffset + paddleWidth &&
      ballX + ballSize >= paddleOffset &&
      ballY + ballSize >= playerY &&
      ballY <= playerY + paddleHeight
    ) {ballSpeedX = Math.abs(ballSpeedX)}
    if (
      ballX + ballSize >= canvas.width - paddleOffset - paddleWidth &&
      ballX <= canvas.width - paddleOffset &&
      ballY + ballSize >= aiY &&
      ballY <= aiY + paddleHeight
    ) {ballSpeedX = -Math.abs(ballSpeedX)}
  }
//game flow/game logic handler
  function update() {
    if (gameEnded) return

    if (upPressed && playerY > 0) playerY -= 5
    if (downPressed && playerY + paddleHeight < canvas.height) playerY += 5
    moveAI()

    if (performance.now() >= ballmvntInterval) {
      ballX += ballSpeedX
      ballY += ballSpeedY
    }

    if (ballY <= 0 || ballY + ballSize >= canvas.height) ballSpeedY = -ballSpeedY

    if (ballX < 0) {
      aiScore++
      if (aiScore >= maxScore && !gameEnded) return endGame()
      resetBall(1)
    }

    if (ballX + ballSize > canvas.width) {
      playerScore++
      if (playerScore >= maxScore && !gameEnded) return endGame()
      resetBall(-1)
    }

    checkCollision()
  }
//renders the ball, paddle and dash indicator
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawNet()
    drawPaddle(paddleOffset, playerY)
    drawPaddle(canvas.width - paddleWidth - paddleOffset, aiY)
    drawBall()
    drawScore()
  }
//loopd the game flow 
  function loop() {
    update()
    draw()
    if (!gameEnded) pingPongAnimationId = requestAnimationFrame(loop)
  }
  loop()
}