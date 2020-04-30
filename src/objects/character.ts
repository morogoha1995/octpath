import { WIDTH, HEIGHT } from "../constants"
import { Collidable } from "./collidable"
import { Bullet } from "./bullet"

class Character extends Collidable {
  private hp = 3
  private nextFiring = 0
  private bulletVelocityY = 300
  private firingGrade = 1
  private bulletGrade = 1

  constructor(scene: Phaser.Scene) {
    super(scene, WIDTH / 2, HEIGHT / 2, "character")

    this.body.setCollideWorldBounds(true)
  }

  attack(): Bullet {
    const bullet = new Bullet(this.scene, this.x, this.y, "bullet")
    bullet.body.setVelocity(0, -this.bulletVelocityY)

    this.calcNextFiring()

    return bullet
  }

  private calcNextFiring() {
    this.nextFiring = this.scene.time.now + Math.floor(600 / this.firingGrade)
  }

  canAttack(): boolean {
    return this.scene.time.now > this.nextFiring
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
