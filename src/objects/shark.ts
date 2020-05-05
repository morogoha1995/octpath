import { Enemy } from "./enemy"
import { Bullet } from "./bullet"

class Shark extends Enemy {
  constructor(scene: Phaser.Scene) {
    super(scene, "shark")

    this.speed = 120
    this.bulletSpeed = 50
    this.firingInterval = 2400
    this.score = 200
  }

  attack(characterX: number, characterY: number): Bullet {
    const bullet = super.attack(characterX, characterY)
    bullet.setDisplaySize(40, 40)
    return bullet
  }
}

export {
  Shark
}
