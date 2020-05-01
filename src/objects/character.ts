import { WIDTH, HEIGHT } from "../constants"
import { Collidable } from "./collidable"
import { Bullet } from "./bullet"

class Character extends Collidable {
  private hp = 3
  private nextFiring = 0
  private bulletVelocityY = 300
  private firingGrade = 1
  private bulletCounts = 1

  constructor(scene: Phaser.Scene) {
    super(scene, WIDTH / 2, HEIGHT / 2, "character")

    this.body.setCollideWorldBounds(true)
  }

  attack(): Bullet[] {
    const bullets: Bullet[] = []

    const baseVx = this.bulletCounts === 1 ? 0 : 20
    const maxVx = baseVx * this.bulletCounts
    const vxMargin = maxVx * 2 / this.bulletCounts
    let vx = -maxVx

    for (let i = 0; i < this.bulletCounts; i++) {
      const bullet = new Bullet(this.scene, this.x, this.y, "bullet")
      bullet.body.setVelocity(vx, -this.bulletVelocityY)
      bullets.push(bullet)
      vx += vxMargin
    }

    this.calcNextFiring()

    return bullets
  }

  private calcNextFiring() {
    this.nextFiring = this.scene.time.now + Math.floor(300 / this.firingGrade)
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
