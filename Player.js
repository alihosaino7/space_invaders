import {
  PLAYER_SHOOT_DELAY,
  SPEED,
  PLAYER_HEIGHT,
  PLAYER_WIDTH,
  PLAYER_BULLET_SPEED,
  PLAYER_SPEED,
} from "./constants.js";

export class Player {
  constructor(x, y, ctx, bulletsController) {
    this.x = x;
    this.y = y;
    this.width = PLAYER_WIDTH;
    this.height = PLAYER_HEIGHT;
    this.color = "#fff";
    this.ctx = ctx;
    this.bulletsController = bulletsController;
    this.lastBulletTime = 0;
    this.shootDelay = PLAYER_SHOOT_DELAY;
  }

  shoot() {
    const currentTime = performance.now();
    if (currentTime - this.lastBulletTime > this.shootDelay) {
      this.bulletsController.shootEnemy(
        this.x + this.width / 2,
        this.y + 15,
        "#fff"
      );
      this.lastBulletTime = currentTime;
    }
  }

  handleMovement(keys) {
    if (keys.ArrowRight) {
      this.x += PLAYER_SPEED;
    }
    if (keys.ArrowLeft) {
      this.x -= PLAYER_SPEED;
    }
    if (keys.ArrowUp) {
      this.y -= PLAYER_SPEED;
    }
    if (keys.ArrowDown) {
      this.y += PLAYER_SPEED;
    }
    if (keys.space) {
      this.shoot();
    }
  }

  checkBoundaries() {
    if (this.x < 0) {
      this.x = 0;
    }

    if (this.x + this.width > innerWidth) {
      this.x = innerWidth - this.width;
    }

    if (this.y > innerHeight - 70) {
      this.y = innerHeight - 70;
    }
  }

  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  update(keys) {
    this.handleMovement(keys);
    this.checkBoundaries();
    this.draw();
  }
}
