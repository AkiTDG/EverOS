let keydownHandler, keyupHandler
let pingPongAnimationId, pingPongLoop
export let playerScore = 0
export let aiScore = 0
export let gameEnded = false

export function cleanupPingPong() {
  const canvas = document.getElementById("pongCanvas")
  if (canvas && canvas.parentNode) canvas.parentNode.removeChild(canvas)
  const style = document.getElementById("pong-style")
  if (style) style.remove()
  const pongUI = document.getElementById('pongUI')
  if (pongUI) pongUI.remove()
  if (pingPongAnimationId) cancelAnimationFrame(pingPongAnimationId)
  if (pingPongLoop) clearInterval(pingPongLoop)
  if (keydownHandler) document.removeEventListener("keydown", keydownHandler)
  if (keyupHandler) document.removeEventListener("keyup", keyupHandler)
}

export function endGame() {
    if (gameEnded) return gameEnded = true
    const gameOverScreen = `
+----------------------------------------------------+
|===[ GAME OVER ]===                                 |
|                                                    |
|Final Score: Player ${playerScore} - ${aiScore} COM                       |
|Play again?      [Type 'nav pong']                  |
|Return home?     [Type 'nav home']                  |
+----------------------------------------------------+`
    writeToConsole(gameOverScreen)
    cleanupPingPong()
  }

export function PingPong() {
  const consoleDiv = document.getElementById("console")
  consoleDiv.innerHTML = `<canvas id="pongCanvas" width="525" height="400"></canvas>`
  const style = document.createElement("style")
  style.id = "pong-style"
  style.textContent = `
    #console {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 569px;
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

  const canvas = document.getElementById("pongCanvas")
  canvas.addEventListener("touchmove", e => {
  e.preventDefault()
  const touch = e.touches[0]
  const rect = canvas.getBoundingClientRect()
  const y = touch.clientY - rect.top
  playerY = y - paddleHeight / 2

  // Clamp within canvas
  if (playerY < 0) playerY = 0
  if (playerY + paddleHeight > canvas.height) playerY = canvas.height - paddleHeight
}, { passive: false })

  const ctx = canvas.getContext("2d")

  const paddleHeight = 80
  const paddleWidth = 10
  const paddleOffset = 15
  const ballSize = 20
  const maxScore = 20

  let playerY = canvas.height / 2 - paddleHeight / 2
  let aiY = canvas.height / 2 - paddleHeight / 2
  let ballX = canvas.width / 2
  let ballY = canvas.height / 2
  let ballSpeedX = 3
  let ballSpeedY = 2
  let ballmvntInterval = 0
  
  let aiCanMove = true
  let aiLastToggle = performance.now()
  let aiToggleDuration = 5000
  let upPressed = false
  let downPressed = false
  

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

  function moveAI() {
    const now = performance.now()
    if (now - aiLastToggle >= aiToggleDuration) {
      aiCanMove = !aiCanMove
      aiLastToggle = now
      aiToggleDuration = aiCanMove
        ? 3000 + Math.random() * 3000  
        : 800 + Math.random() * 800    
    }
    if (aiCanMove) {
      const target = ballY - paddleHeight / 2 + ballSize / 2
      const dy = target - aiY
      const baseSpeed = 3 + aiScore * 0.2
      const isDashing = Math.random() < 0.1
      const moveSpeed = isDashing ? baseSpeed * 2 : baseSpeed
        if (Math.abs(dy) > moveSpeed) {
          aiY += moveSpeed * Math.sign(dy)
        }    
        else {
          aiY += dy
        }
    }
}

  function resetBall(direction = 1) {
    ballX = canvas.width / 2 - ballSize / 2
    ballY = canvas.height / 2 - ballSize / 2
    ballSpeedX = direction * 3
    ballSpeedY = 2 * (Math.random() > 0.5 ? 1 : -1)
  }

  function checkCollision() {
    if (
      ballX <= paddleOffset + paddleWidth &&
      ballX >= paddleOffset &&
      ballY + ballSize >= playerY &&
      ballY <= playerY + paddleHeight
    ) {
      ballSpeedX = Math.abs(ballSpeedX)
    }
    if (
      ballX + ballSize >= canvas.width - paddleOffset - paddleWidth &&
      ballX + ballSize <= canvas.width - paddleOffset &&
      ballY + ballSize >= aiY &&
      ballY <= aiY + paddleHeight
    ) {
      ballSpeedX = -Math.abs(ballSpeedX)
    }
  }

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
      if (aiScore >= maxScore) return endGame()
      resetBall(1)
    }

    if (ballX + ballSize > canvas.width) {
      playerScore++
      if (playerScore >= maxScore) return endGame()
      resetBall(-1)
    }

    checkCollision()
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawNet()
    drawPaddle(paddleOffset, playerY)
    drawPaddle(canvas.width - paddleWidth - paddleOffset, aiY)
    drawBall()
    drawScore()
  }

  function loop() {
    update()
    draw()
    if (!gameEnded) pingPongAnimationId = requestAnimationFrame(loop)
  }

  
  loop()
}
