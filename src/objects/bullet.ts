import { Collidable } from "./collidable";

class Bullet extends Collidable {
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture)
    this.setDisplaySize(12, 12)
  }
}

export {
  Bullet
}
