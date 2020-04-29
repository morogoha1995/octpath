import { Collidable } from "./collidable";

class Bullet extends Collidable {
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture)
  }
}

export {
  Bullet
}
