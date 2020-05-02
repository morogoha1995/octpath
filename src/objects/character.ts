import { WIDTH, HEIGHT } from "../constants"
import { Collidable } from "./collidable"
import { Bullet } from "./bullet"
import { ItemContent } from "../../types/item"

class Character extends Collidable {
  private hp = 3
  private nextFiring = 0
  private bulletVelocityY = 300
  private items: any = {
    firingSpeed: 0,
    scatter: 0,
    enlarge: 0,
  }

  constructor(scene: Phaser.Scene) {
    super(scene, WIDTH / 2, HEIGHT / 2, "character")

    this.setDepth(9)
    this.body.setCollideWorldBounds(true)
  }

  attack(): Bullet[] {
    const bullets: Bullet[] = []
    const bulletSize = 12 + (4 * this.items.enlarge)
    const bulletCounts = 1 + (2 * this.items.scatter)
    const baseVx = bulletCounts === 1 ? 0 : 20
    const maxVx = baseVx * bulletCounts
    const vxMargin = maxVx * 2 / bulletCounts
    let vx = -maxVx

    for (let i = 0; i < bulletCounts; i++) {
      const bullet = new Bullet(this.scene, this.x, this.y, "bullet")
      bullet.body.setVelocity(vx, -this.bulletVelocityY)
      bullet
        .setDisplaySize(bulletSize, bulletSize)
      bullets.push(bullet)
      vx += vxMargin
    }

    this.calcNextFiring()

    return bullets
  }

  private calcNextFiring() {
    const reloadTime = 300 - (50 * this.items.firingSpeed)
    this.nextFiring = this.scene.time.now + Math.floor(reloadTime)
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

  upgrade(itemContent: ItemContent) {
    const maxGrade = 2
    if (this.items[itemContent] === maxGrade)
      return

    this.items[itemContent] += 1
  }

  isDead(): boolean {
    return this.hp <= 0
  }
}

export {
  Character
}
