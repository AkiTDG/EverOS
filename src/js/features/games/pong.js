export function PingPong() {
  const consoleDiv = document.getElementById("console")

  // Clear and inject canvas HTML
  consoleDiv.innerHTML = `
    <canvas id="pongCanvas" width="550" height="400"></canvas>
  `

  // Inject styles for canvas and console
  const style = document.createElement("style")
  style.id = "pong-style"
  style.textContent = `
    #console {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 50%
      height: 500px;
    }
    canvas {
      display: block;
      margin: 0 auto;
      background: #000;
      border: 2px solid lime;
      border-radius: 12px;
    }
  `
  document.head.appendChild(style)

  const canvas = document.getElementById("pongCanvas")
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
  let playerScore = 0
  let aiScore = 0
  let upPressed = false
  let downPressed = false
  let gameEnded = false

  document.addEventListener("keydown", e => {
    if (e.key === "ArrowUp") upPressed = true
    if (e.key === "ArrowDown") downPressed = true
    if (e.key === "End") endGame()
  })

  document.addEventListener("keyup", e => {
    if (e.key === "ArrowUp") upPressed = false
    if (e.key === "ArrowDown") downPressed = false
  })
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
    const target = ballY - paddleHeight / 2 + ballSize / 2
    aiY += (target - aiY) * 0.06
  }

  function resetBall(direction = 1) {
    ballX = direction > 0
      ? canvas.width - paddleOffset - paddleWidth - ballSize - 5
      : paddleOffset + paddleWidth + 5
    ballY = Math.random() * (canvas.height - ballSize)
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

    ballX += ballSpeedX
    ballY += ballSpeedY

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
    if (!gameEnded) requestAnimationFrame(loop)
  }

  function endGame() {
    gameEnded = true
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.font = "28px Arial"
    ctx.fillStyle = "#fff"
    ctx.textAlign = "center"
    ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2 - 20)
    ctx.fillText(`Final Score: Player ${playerScore} - ${aiScore} COM`, canvas.width / 2, canvas.height / 2 + 20)

    const style = document.getElementById("pong-style")
    if (style) style.remove()
  }

  loop()
}

