import { Enemy } from "./enemy"
import { Bullet } from "./bullet"

class Shark extends Enemy {
  constructor(scene: Phaser.Scene) {
    super(scene, "shark")

    this.speed = 120
    this.bulletSpeed = 120
    this.firingSpeed = 1500
    this.hp = 3
  }
}

export {
  Shark
}
