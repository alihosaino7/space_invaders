import { Bullet } from "./Bullet.js";
import { PLAYER_BULLET_SPEED } from "./constants.js";

export class BulletsController {
  playerBullets = [];
  enemiesBullets = [];

  constructor(ctx) {
    this.ctx = ctx;
  }

  shootEnemy(x, y, color) {
    this.playerBullets.push(
      new Bullet(x, y, color, this.ctx, "player", "up", PLAYER_BULLET_SPEED)
    );
  }

  shootPlayer(x, y, color, speed) {
    this.enemiesBullets.push(
      new Bullet(x, y, color, this.ctx, "enemy", "down", speed)
    );
  }

  drawBullets() {
    this.playerBullets.forEach((bullet) => {
      bullet.draw();
    });
    this.enemiesBullets.forEach((bullet) => {
      bullet.draw();
    });
  }

  moveBullets() {
    this.playerBullets.forEach((bullet) => {
      bullet.update();
    });
    this.enemiesBullets.forEach((bullet) => {
      bullet.update();
    });
  }

  update() {
    this.moveBullets();
  }
}
