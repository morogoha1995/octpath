import { Collidable } from "./collidable"

class Enemy extends Collidable {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "enemy")
  }
}

export {
  Enemy
}
