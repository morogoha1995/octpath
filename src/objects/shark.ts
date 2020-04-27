import { Enemy } from "./enemy";

class Shark extends Enemy {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "shark")

    this.body.setSize(48, 48)
    this.speed = this.speed * 1.8
  }
}

export {
  Shark
}
