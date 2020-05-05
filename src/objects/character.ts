import { WIDTH, HEIGHT } from "../constants"
import { Collidable } from "./collidable"
import { Bullet } from "./bullet"
import { ItemContent, CharacterStatus } from "../../types/item"

class Character extends Collidable {
  private hp = 1
  private velocity = 200
  private nextFiring = 0
  private bulletVelocityY = 300
  private status: CharacterStatus = {
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

  // アイテムに対応するステータスをアップグレードする。
  // 返り値はアップグレードが成功したか否か。既にステータスが最大値であれば失敗する（falseが返る）。
  upgrade(itemContent: ItemContent): boolean {
    if (this.isMaxGrade(itemContent))
      return false

    this.status[itemContent] += 1
    return true
  }

  isDead(): boolean {
    return this.hp <= 0
  }

  private isMaxGrade(key: ItemContent): boolean {
    return this.status[key] === 3
  }

  getStatus(key: ItemContent): number {
    return this.status[key]
  }

  getAllStatus(): CharacterStatus {
    return this.status
  }
}

export {
  Character
}
