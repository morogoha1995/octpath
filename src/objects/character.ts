import { WIDTH, HEIGHT } from "../constants"
import { Collidable } from "./collidable"

class Character extends Collidable {
  private speed = 100

  constructor(scene: Phaser.Scene) {
    super(scene, WIDTH / 2, HEIGHT / 2, "character")
  }

  move(velocity: any) {
    const x = velocity.x * 10
    const y = velocity.y * 10
    this.body.setVelocity(-x, -y)
  }

  die() {

  }
}

export {
  Character
}
