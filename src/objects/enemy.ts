import { Collidable } from "./collidable"
import { WIDTH, HEIGHT } from "../constants"

class Enemy extends Collidable {
  protected speed = 100
  protected hp = 3
  private isDying = false

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture)

    this.scene.add.tween({
      targets: this,
      duration: 2000,
      x: WIDTH / 2,
      y: HEIGHT / 2,
      yoyo: true
    })
  }

  update() {
    if (this.isOuted()) {
      this.destroy()
      return
    }

    if (this.isDying)
      return

    this.move()
  }

  private isOuted(): boolean {
    return this.body.right < 0 ||
      this.body.left > WIDTH ||
      this.body.bottom < 0 ||
      this.body.top > HEIGHT
  }

  isDead(): boolean {
    return this.hp <= 0
  }

  die() {
    this.isDying = true
    this.scene.add.tween({
      targets: this,
      alpha: 0,
      duration: 1000
    })
  }

  // TODO
  private move() {
  }
}

export {
  Enemy
}
