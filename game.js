const canvas = document.getElementById('snake-canvas');
const statusEl = document.getElementById('game-status');
const scoreEl = document.getElementById('score-value');
const bestEl = document.getElementById('best-value');
const gameShell = document.querySelector('.game-shell');
const actionButtons = document.querySelectorAll('[data-action]');
const directionButtons = document.querySelectorAll('[data-direction]');

const GRID_SIZE = 24;
const CELL_SIZE = 20;
const CANVAS_SIZE = GRID_SIZE * CELL_SIZE;
const STORAGE_KEY = 'newrest-snake-best-score';
const START_SPEED = 165;
const SPEED_STEP = 4;
const MIN_SPEED = 95;
const PLAYER_WIN_BONUS = 50;
const ENEMY_LENGTH = 4;

let context = null;
let loopTimer = 0;
let gameActive = false;
let gamePaused = false;
let gameOver = false;
let score = 0;
let bestScore = 0;
let speed = START_SPEED;
let direction = { x: 1, y: 0 };
let nextDirection = { x: 1, y: 0 };
let snake = [];
let enemySnake = [];
let enemyDirection = { x: -1, y: 0 };
let food = { x: 10, y: 10 };
let hasInitialized = false;
let swipeStart = null;

if (canvas) {
  context = canvas.getContext('2d');
}

function readBestScore() {
  try {
    return Number(localStorage.getItem(STORAGE_KEY) || 0);
  } catch {
    return 0;
  }
}

function writeBestScore(value) {
  try {
    localStorage.setItem(STORAGE_KEY, String(value));
  } catch {
    return;
  }
}

function syncCanvasSize() {
  if (!canvas || !context) {
    return;
  }

  const ratio = Math.max(window.devicePixelRatio || 1, 1);
  canvas.width = CANVAS_SIZE * ratio;
  canvas.height = CANVAS_SIZE * ratio;
  canvas.style.width = '100%';
  canvas.style.height = 'auto';
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
}

function updateHud(message) {
  if (statusEl) {
    statusEl.textContent = message;
  }
  if (scoreEl) {
    scoreEl.textContent = String(score);
  }
  if (bestEl) {
    bestEl.textContent = String(bestScore);
  }
}

function randomCell() {
  return {
    x: Math.floor(Math.random() * GRID_SIZE),
    y: Math.floor(Math.random() * GRID_SIZE),
  };
}

function sameCell(a, b) {
  return a.x === b.x && a.y === b.y;
}

function isInBounds(cell) {
  return cell.x >= 0 && cell.y >= 0 && cell.x < GRID_SIZE && cell.y < GRID_SIZE;
}

function isOppositeDirection(a, b) {
  return a.x === -b.x && a.y === -b.y;
}

function hasCell(segments, cell) {
  return segments.some((segment) => sameCell(segment, cell));
}

function getDirectionOptions(currentDirection) {
  return [
    { x: 0, y: -1 },
    { x: 0, y: 1 },
    { x: -1, y: 0 },
    { x: 1, y: 0 },
  ].filter((candidate) => !isOppositeDirection(candidate, currentDirection));
}

function canEnemyStep(candidateDirection) {
  if (!enemySnake.length) {
    return false;
  }

  const nextHead = {
    x: enemySnake[0].x + candidateDirection.x,
    y: enemySnake[0].y + candidateDirection.y,
  };

  if (!isInBounds(nextHead)) {
    return false;
  }

  return !hasCell(enemySnake.slice(0, -1), nextHead);
}

function getEnemyDirection() {
  const options = getDirectionOptions(enemyDirection);
  const validOptions = options.filter((candidate) => canEnemyStep(candidate));
  const straightIsValid = canEnemyStep(enemyDirection);

  if (straightIsValid && Math.random() < 0.6) {
    return enemyDirection;
  }

  if (validOptions.length > 0) {
    return validOptions[Math.floor(Math.random() * validOptions.length)];
  }

  if (straightIsValid) {
    return enemyDirection;
  }

  const fallback = options.find((candidate) => isInBounds({
    x: enemySnake[0].x + candidate.x,
    y: enemySnake[0].y + candidate.y,
  }));

  return fallback || enemyDirection;
}

function canPlaceEnemy(segments) {
  return segments.every((segment) => isInBounds(segment) && !hasCell(snake, segment) && !sameCell(food, segment));
}

function createEnemySnake() {
  for (let attempt = 0; attempt < 250; attempt += 1) {
    const orientation = Math.random() < 0.5 ? { x: 1, y: 0 } : { x: 0, y: 1 };
    const head = randomCell();
    const segments = [];
    let valid = true;

    for (let index = 0; index < ENEMY_LENGTH; index += 1) {
      const segment = {
        x: head.x - orientation.x * index,
        y: head.y - orientation.y * index,
      };
      if (!isInBounds(segment) || hasCell(snake, segment) || sameCell(food, segment) || hasCell(segments, segment)) {
        valid = false;
        break;
      }
      segments.push(segment);
    }

    if (valid && canPlaceEnemy(segments)) {
      enemyDirection = orientation;
      return segments;
    }
  }

  const fallback = [
    { x: GRID_SIZE - 4, y: 3 },
    { x: GRID_SIZE - 5, y: 3 },
    { x: GRID_SIZE - 6, y: 3 },
    { x: GRID_SIZE - 7, y: 3 },
  ];
  enemyDirection = { x: -1, y: 0 };
  return fallback;
}

function placeFood() {
  let candidate = randomCell();
  while (
    snake.some((segment) => sameCell(segment, candidate))
    || enemySnake.some((segment) => sameCell(segment, candidate))
  ) {
    candidate = randomCell();
  }
  food = candidate;
}

function refreshBestScore() {
  if (score > bestScore) {
    bestScore = score;
    writeBestScore(bestScore);
  }
}

function resetGame() {
  clearTimeout(loopTimer);
  score = 0;
  speed = START_SPEED;
  direction = { x: 1, y: 0 };
  nextDirection = { x: 1, y: 0 };
  snake = [
    { x: 7, y: 12 },
    { x: 6, y: 12 },
    { x: 5, y: 12 },
  ];
  enemySnake = createEnemySnake();
  gameActive = false;
  gamePaused = false;
  gameOver = false;
  placeFood();
  updateHud('Press Start to begin.');
  draw();
}

function startGame() {
  if (gameOver) {
    resetGame();
  }

  if (!gameActive) {
    gameActive = true;
    gamePaused = false;
    updateHud('Snake is moving. Keep going.');
    scheduleTick();
  }
}

function pauseGame() {
  if (!gameActive || gameOver) {
    return;
  }

  gamePaused = !gamePaused;
  if (gamePaused) {
    clearTimeout(loopTimer);
    updateHud('Game paused.');
  } else {
    updateHud('Snake is moving. Keep going.');
    scheduleTick();
  }
}

function gameOverState() {
  gameActive = false;
  gamePaused = false;
  gameOver = true;
  refreshBestScore();
  updateHud('Game over. Press Restart to try again.');
}

function setDirection(candidate) {
  const opposite = candidate.x === -direction.x && candidate.y === -direction.y;
  if (opposite) {
    return;
  }

  if (candidate.x === direction.x && candidate.y === direction.y) {
    return;
  }

  nextDirection = candidate;
}

function moveSnake() {
  if (!gameActive || gamePaused || gameOver) {
    return;
  }

  direction = nextDirection;
  const nextHead = {
    x: snake[0].x + direction.x,
    y: snake[0].y + direction.y,
  };
  const nextEnemyDirection = getEnemyDirection();
  const nextEnemyHead = {
    x: enemySnake[0].x + nextEnemyDirection.x,
    y: enemySnake[0].y + nextEnemyDirection.y,
  };

  const hitWall = !isInBounds(nextHead);
  const hitSelf = hasCell(snake, nextHead);

  if (hitWall || hitSelf) {
    gameOverState();
    draw();
    return;
  }

  snake.unshift(nextHead);

  const ateFood = sameCell(nextHead, food);
  if (ateFood) {
    score += 10;
    refreshBestScore();
    speed = Math.max(MIN_SPEED, speed - SPEED_STEP);
    placeFood();
    updateHud('Nice! Keep going.');
  } else {
    snake.pop();
  }

  enemyDirection = nextEnemyDirection;
  enemySnake.unshift(nextEnemyHead);
  enemySnake.pop();

  const playerHead = snake[0];
  const enemyHead = enemySnake[0];
  const playerHitsEnemy = hasCell(enemySnake, playerHead);
  const enemyHitsPlayer = hasCell(snake, enemyHead);

  if (playerHitsEnemy || enemyHitsPlayer) {
    if (snake.length > enemySnake.length) {
      score += PLAYER_WIN_BONUS;
      refreshBestScore();
      placeFood();
      enemySnake = createEnemySnake();
      updateHud('You won the clash! +50 points.');
    } else if (snake.length < enemySnake.length) {
      gameOverState();
      updateHud('Game over. The enemy was longer.');
      draw();
      return;
    } else {
      enemySnake = createEnemySnake();
      updateHud('Clash tie. The enemy respawns.');
    }
  }

  draw();
}

function scheduleTick() {
  clearTimeout(loopTimer);
  loopTimer = setTimeout(() => {
    moveSnake();
    if (gameActive && !gamePaused && !gameOver) {
      scheduleTick();
    }
  }, speed);
}

function drawGrid() {
  context.fillStyle = '#0f1e28';
  context.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

  context.strokeStyle = 'rgba(255,255,255,0.04)';
  context.lineWidth = 1;
  for (let i = 0; i <= GRID_SIZE; i += 1) {
    const offset = i * CELL_SIZE;
    context.beginPath();
    context.moveTo(offset, 0);
    context.lineTo(offset, CANVAS_SIZE);
    context.stroke();

    context.beginPath();
    context.moveTo(0, offset);
    context.lineTo(CANVAS_SIZE, offset);
    context.stroke();
  }
}

function drawFood() {
  context.fillStyle = '#ffb347';
  context.beginPath();
  context.arc(
    food.x * CELL_SIZE + CELL_SIZE / 2,
    food.y * CELL_SIZE + CELL_SIZE / 2,
    CELL_SIZE * 0.32,
    0,
    Math.PI * 2
  );
  context.fill();
}

function drawSnake() {
  snake.forEach((segment, index) => {
    const isHead = index === 0;
    context.fillStyle = isHead ? '#74d7ff' : '#3fb38f';
    context.fillRect(
      segment.x * CELL_SIZE + 2,
      segment.y * CELL_SIZE + 2,
      CELL_SIZE - 4,
      CELL_SIZE - 4
    );
  });
}

function drawEnemy() {
  enemySnake.forEach((segment, index) => {
    const isHead = index === 0;
    context.fillStyle = isHead ? '#ff7c7c' : '#cc5b5b';
    context.fillRect(
      segment.x * CELL_SIZE + 2,
      segment.y * CELL_SIZE + 2,
      CELL_SIZE - 4,
      CELL_SIZE - 4
    );
  });
}

function drawOverlay() {
  if (!gameActive && !gameOver) {
    context.fillStyle = 'rgba(15, 30, 40, 0.35)';
    context.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }

  if (gamePaused) {
    context.fillStyle = 'rgba(15, 30, 40, 0.45)';
    context.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }

  if (gameOver) {
    context.fillStyle = 'rgba(15, 30, 40, 0.5)';
    context.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

function draw() {
  if (!context) {
    return;
  }

  drawGrid();
  drawFood();
  drawSnake();
  drawEnemy();
  drawOverlay();
}

function bindControls() {
  actionButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const action = button.dataset.action;
      if (action === 'start') {
        if (!gameActive && !gameOver) {
          startGame();
        } else if (gameOver) {
          resetGame();
          startGame();
        }
      }
      if (action === 'pause') {
        pauseGame();
      }
      if (action === 'restart') {
        resetGame();
        startGame();
      }
    });
  });

  directionButtons.forEach((button) => {
    button.addEventListener('click', () => {
      setDirection(parseDirection(button.dataset.direction));
    });
  });

  window.addEventListener('keydown', (event) => {
    const keyDirection = parseKey(event.key);
    if (keyDirection) {
      event.preventDefault();
      setDirection(keyDirection);
    }

    if (event.key === ' ' || event.key === 'Spacebar') {
      event.preventDefault();
      if (!gameActive) {
        startGame();
      } else {
        pauseGame();
      }
    }

    if (event.key === 'Enter' && gameOver) {
      resetGame();
      startGame();
    }
  }, { passive: false });

  if (canvas) {
    canvas.addEventListener('click', () => {
      if (!gameActive) {
        startGame();
      }
    });

    canvas.addEventListener('pointerdown', (event) => {
      if (!gameActive) {
        startGame();
      }
      swipeStart = { x: event.clientX, y: event.clientY };
    });

    canvas.addEventListener('pointerup', (event) => {
      if (!swipeStart) {
        return;
      }

      const deltaX = event.clientX - swipeStart.x;
      const deltaY = event.clientY - swipeStart.y;
      const threshold = 22;

      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > threshold) {
        setDirection(deltaX > 0 ? { x: 1, y: 0 } : { x: -1, y: 0 });
      } else if (Math.abs(deltaY) > threshold) {
        setDirection(deltaY > 0 ? { x: 0, y: 1 } : { x: 0, y: -1 });
      }

      swipeStart = null;
    });
  }
}

function parseKey(key) {
  switch (key.toLowerCase()) {
    case 'arrowup':
    case 'w':
      return { x: 0, y: -1 };
    case 'arrowdown':
    case 's':
      return { x: 0, y: 1 };
    case 'arrowleft':
    case 'a':
      return { x: -1, y: 0 };
    case 'arrowright':
    case 'd':
      return { x: 1, y: 0 };
    default:
      return null;
  }
}

function parseDirection(directionName) {
  switch (directionName) {
    case 'up':
      return { x: 0, y: -1 };
    case 'down':
      return { x: 0, y: 1 };
    case 'left':
      return { x: -1, y: 0 };
    case 'right':
      return { x: 1, y: 0 };
    default:
      return { x: 1, y: 0 };
  }
}

function initGame() {
  if (hasInitialized || !canvas || !context) {
    return;
  }

  hasInitialized = true;
  bestScore = readBestScore();
  syncCanvasSize();
  bindControls();
  resetGame();
  draw();
}

window.addEventListener('resize', () => {
  if (canvas && context) {
    syncCanvasSize();
    draw();
  }
});

if (gameShell && !gameShell.dataset.initialized) {
  gameShell.dataset.initialized = 'true';
  initGame();
}
