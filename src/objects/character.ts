import { WIDTH, HEIGHT } from "../constants"
import { Collidable } from "./collidable"
import { Bullet } from "./bullet"
import { ItemContent, CharacterStatus } from "../../types/item"

class Character extends Collidable {
  private hp = 1
  private velocity = 200
  private nextFiring = 0
  private bulletVelocityY = 300
  private status: any = {
    firingSpeed: 0,
    scatter: 0,
    enlarge: 0,
  }
  private isHurting = false

  constructor(scene: Phaser.Scene) {
    super(scene, WIDTH / 2, HEIGHT / 2, "character")

    this.setDepth(9)
    this.body.setCollideWorldBounds(true)
  }

  attack(): Bullet[] {
    const bullets: Bullet[] = []
    const bulletSize = 12 + (4 * this.status.enlarge)
    const bulletCounts = 1 + (2 * this.status.scatter)
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
    const reloadTime = 300 - (50 * this.status.firingSpeed)
    this.nextFiring = this.scene.time.now + Math.floor(reloadTime)
  }

  canAttack(): boolean {
    return this.scene.time.now > this.nextFiring
  }

  move(direction: any) {
    let vx = 0
    let vy = 0
    if (direction.right)
      vx = this.velocity
    else if (direction.left)
      vx = -this.velocity

    if (direction.down)
      vy = this.velocity
    else if (direction.up)
      vy = -this.velocity

    this.body.setVelocity(vx, vy)
  }

  damaged() {
    this.hp--
    this.isHurting = true

    this.scene.add.tween({
      targets: this,
      duration: 80,
      alpha: 0,
      repeat: 4,
      yoyo: true,
      onComplete: () => this.isHurting = false
    })
  }

  getIsHurting(): boolean {
    return this.isHurting
  }

  upgrade(itemContent: ItemContent) {
    const maxGrade = 2
    if (this.status[itemContent] === maxGrade)
      return

    this.status[itemContent] += 1
  }

  isDead(): boolean {
    return this.hp <= 0
  }

  getStatus(): CharacterStatus {
    return this.status
  }
}

export {
  Character
}
