import { Enemy } from "./Enemy.js";
import { ENEMY_HEIGHT, ENEMY_WIDTH, SPEED } from "./constants.js";
import { getRandomNum } from "./utils.js";

export const COL_GAP = 15;
export const ROW_GAP = 20;

export class EnemyGrid {
  constructor(y, ctx, bulletsController) {
    this.isFirstRow = true;
    this.enemies = [];
    this.enemiesKilled = false;
    this.bulletsController = bulletsController;
    this.ctx = ctx;
    this.gridY = y;
    this.inMiddle = true;
    this.gridDx = 1;
    this.lastBulletTime = 0;
    this.shootDelay = 500;
    this.rows = 4;
    this.columns = 11;
    this.width = ENEMY_WIDTH * this.columns + COL_GAP * (this.columns - 1);
    this.gridX = innerWidth / 2 - this.width;
    this.init();
  }

  init() {
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.columns; col++) {
        const enemyStartPoint = this.gridX + (ENEMY_WIDTH + COL_GAP) * col;
        const enemyY = this.gridY + row * (ROW_GAP + ENEMY_HEIGHT);
        this.enemies.push(new Enemy(enemyStartPoint, enemyY, this.ctx));
      }
    }
  }

  recreateGrid(shootDelay) {
    this.shootDelay = shootDelay;
    this.cols += 1;
    this.gridX = 100;
    this.rows += 1;
    this.init();
    this.draw();
  }

  draw() {
    this.enemies.forEach((enemy) => {
      enemy.draw();
    });
  }

  shoot(x, y, speed) {
    const currentTime = performance.now();
    if (currentTime - this.lastBulletTime > this.shootDelay) {
      this.bulletsController.shootPlayer(x, y, "red", speed);
      this.lastBulletTime = currentTime;
    }
  }

  update() {
    if (this.gridX + this.width > innerWidth || this.gridX < 0) {
      this.gridDx = -this.gridDx;
      this.inMiddle = false;
    } else {
      this.inMiddle = true;
    }

    this.gridX += this.gridDx;

    const randomEnemyIndex = getRandomNum({
      from: 0,
      to: this.enemies.length - 1,
    });

    this.enemies.forEach((enemy, index) => {
      enemy.x += this.gridDx;

      if (!this.inMiddle) {
        enemy.y += 40;
      }

      if (randomEnemyIndex === index) {
        this.shoot(enemy.x + enemy.width / 2, enemy.y + enemy.height);
      }

      enemy.update();
    });
  }
}
