import { BULLET_HEIGHT, BULLET_WIDTH, SPEED } from "./constants.js";

export class Bullet {
  constructor(x, y, color, ctx, shooter, dir, speed = SPEED * 2) {
    this.shooter = shooter;
    this.dir = dir;
    this.x = x;
    this.y = y;
    this.width = BULLET_WIDTH;
    this.height = BULLET_HEIGHT;
    this.dy = 0;
    this.color = color;
    this.ctx = ctx;
    this.speed = speed;
  }

  getBoundingBox() {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
    };
  }

  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  update() {
    this.dy = this.speed;

    if (this.dir === "up") {
      this.y -= this.dy;
    } else if (this.dir === "down") {
      this.y += this.dy;
    }

    this.draw();
  }
}
