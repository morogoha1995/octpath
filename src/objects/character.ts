import { WIDTH, HEIGHT } from "../constants"
import { Collidable } from "./collidable"

class Character extends Collidable {
  private hp = 3

  constructor(scene: Phaser.Scene) {
    super(scene, WIDTH / 2, HEIGHT / 2, "character")

    this.body.setCollideWorldBounds(true)
  }

  move(velocity: any) {
    const x = velocity.x * 10
    const y = velocity.y * 10
    this.body.setVelocity(-x, -y)
  }

  // TODO
  damaged() {

  }

  isDead(): boolean {
    return this.hp <= 0
  }
}

export {
  Character
}
