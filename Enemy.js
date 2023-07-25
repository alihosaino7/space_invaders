// enemy.js
import { ENEMY_WIDTH, ENEMY_HEIGHT, ENEMY_EYE_RADIUS } from "./constants.js";

export class Enemy {
  constructor(x, y, ctx) {
    this.x = x;
    this.y = y;
    this.dy = 2;
    this.dx = 2;
    this.ctx = ctx;
    this.height = ENEMY_HEIGHT;
    this.width = ENEMY_WIDTH;
  }

  getBoundingBox() {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
    };
  }

  drawEyes() {
    const eyeOffsetY = 20;
    this.ctx.beginPath();
    this.ctx.fillStyle = "#000";
    this.ctx.arc(
      this.x + this.width / 4,
      this.y + eyeOffsetY,
      ENEMY_EYE_RADIUS,
      0,
      Math.PI * 2
    );
    this.ctx.arc(
      this.x + this.width - this.width / 4,
      this.y + eyeOffsetY,
      ENEMY_EYE_RADIUS,
      0,
      Math.PI * 2
    );
    this.ctx.fill();
  }

  draw() {
    this.ctx.fillStyle = "#ff0000";
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
    this.drawEyes();
  }

  update() {
    this.draw();
  }
}
