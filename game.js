import { Player } from "./Player.js";
import { EnemyGrid } from "./EnemeyGrid.js";
import { BulletsController } from "./BulletsController.js";
import { LIFES, arrowKeysList } from "./constants.js";

const startGameBtn = document.querySelector("#beggining-interface button");

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const arrowKeys = {};

let score = 0;
let remainLifes = LIFES;
let isGameRunning = false;
let currentLevel = 1;
let spaceKey = false;

let bulletsController = new BulletsController(ctx);
let enemyGrid = new EnemyGrid(90, ctx, bulletsController);
let player = new Player(
  canvas.width / 2,
  canvas.height - 70,
  ctx,
  bulletsController
);
// On resizing the canvas size won't cover the new window size until refresh
// So event listener will update the canvas size to new window size while resizing
addEventListener("resize", init);
startGameBtn.addEventListener("click", () => {
  startGameBtn.closest("#beggining-interface").classList.add("close");
  isGameRunning = true;
  animate();
});

init();

function animate() {
  if (isGameRunning) {
    requestAnimationFrame(animate);

    clearCanvas();

    // Fill whole background with black
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawLifesState();
    drawScoreStatus();

    enemyGrid.draw();
    player.draw();
    bulletsController.drawBullets();

    enemyGrid.update();
    player.update({ ...arrowKeys, space: spaceKey });
    bulletsController.update();

    handleBulletAndEnemeyCollision();
    handleBulletAndPlayerCollision();
  }
}

// Event listeners //

// Allowed keys array

addEventListener("keydown", ({ key }) => {
  if (arrowKeysList.includes(key)) {
    arrowKeys[key] = true;
  }
});

addEventListener("keyup", ({ key }) => {
  if (arrowKeysList.includes(key)) {
    arrowKeys[key] = false;
  }
});

// Seperated event listeners to enable press arrows and space key at same time.

addEventListener("keydown", ({ key }) => {
  if (key === " ") {
    spaceKey = true;
  }
});

addEventListener("keyup", ({ key }) => {
  if (key === " ") {
    spaceKey = false;
  }
});

// Utils //

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function handleBulletAndEnemeyCollision() {
  bulletsController.playerBullets.forEach((bullet, bulletIndex) => {
    if (bullet.y < 0) {
      bulletsController.playerBullets.splice(bulletIndex, 1);
    } else {
      for (let i = 0; i < enemyGrid.enemies.length; i++) {
        const enemy = enemyGrid.enemies[i];
        const bulletBox = bullet.getBoundingBox();
        const enemyBox = enemy.getBoundingBox();
        if (
          bulletBox.x < enemyBox.x + enemyBox.width &&
          bulletBox.x + bulletBox.width > enemyBox.x &&
          bulletBox.y < enemyBox.y + enemyBox.height &&
          bulletBox.y + bulletBox.height > enemyBox.y
        ) {
          // Collision detected
          bulletsController.playerBullets.splice(bulletIndex, 1);
          enemyGrid.enemies.splice(i, 1);
          score++;

          if (enemyGrid.enemies.length === 0) {
            currentLevel++;
          }

          if (currentLevel === 2 && enemyGrid.enemies.length === 0) {
            enemyGrid.recreateGrid(200);
          }

          if (currentLevel === 3 && enemyGrid.enemies.length === 0) {
            enemyGrid.recreateGrid(100);
          }

          console.log(currentLevel);

          break; // Exit the loop since bullet can only hit one enemy
        }
      }
    }
  });
}

function showModal(msg) {
  isGameRunning = false;
  const msgModal = document.getElementById("msg-modal");
  msgModal.classList.add("show");
  msgModal.querySelector("[data-msg-area]").innerText = msg;
  msgModal.querySelector("[data-retry-btn]").addEventListener("click", () => {
    location.reload();
  });
}

function handleBulletAndPlayerCollision() {
  for (let i = 0; i < bulletsController.enemiesBullets.length; i++) {
    const bullet = bulletsController.enemiesBullets[i];
    if (bullet.y > innerHeight) {
      bulletsController.enemiesBullets.splice(i, 1);
    } else {
      if (
        bullet.x + bullet.width > player.x &&
        bullet.x < player.x + player.width &&
        bullet.y + bullet.height > player.y &&
        bullet.y < player.y + player.height
      ) {
        bulletsController.enemiesBullets.splice(i, 1);
        remainLifes -= 1;

        break;
      }
    }
  }
}

function drawLifesState() {
  const startingPointX = 40;
  const startingPointY = 40;
  const textOffsetX = 20;
  const radius = 9;
  ctx.fillStyle = "#fff";
  ctx.font = "20px Arial";
  ctx.fillStyle = "#fff";
  ctx.fillText("Lives:", startingPointX, startingPointY);
  for (let i = 0; i < remainLifes; i++) {
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.arc(
      startingPointX +
        textOffsetX +
        ctx.measureText("Lives:").width +
        (textOffsetX + radius) * i,
      startingPointY - radius,
      radius,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }
}

function drawScoreStatus() {
  const startingPointX =
    canvas.width - 40 - ctx.measureText("Score: 000").width;
  const startingPointY = 40;
  ctx.fillStyle = "#fff";
  ctx.font = "20px Arial";
  ctx.fillStyle = "#fff";
  ctx.fillText(`Score: ${score}`, startingPointX, startingPointY);
}

function init() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  // Fill whole background with black
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawLifesState();
  drawScoreStatus();

  player = new Player(
    canvas.width / 2,
    canvas.height - 70,
    ctx,
    bulletsController
  );

  enemyGrid.draw();
  player.draw();
  bulletsController.drawBullets();
}

setInterval(() => {
  if (remainLifes === 0) {
    showModal("You Lost");
  }

  if (currentLevel > 3) {
    showModal("You Won");
  }
}, 500);
