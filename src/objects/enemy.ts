import { Collidable } from "./collidable"
import { WIDTH, HEIGHT } from "../constants"
import { Bullet } from "./bullet"

class Enemy extends Collidable {
  protected speed = 60
  protected bulletSpeed = 100
  protected firingSpeed = 2000
  private nextFiring = 0
  protected hp = 1

  constructor(scene: Phaser.Scene, texture: string) {
    super(scene, Phaser.Math.Between(0, WIDTH), 0, texture)

    this.body.setVelocity(0, this.speed)
  }

  setMoveto(characterX: number, characterY: number) {
    this.scene.physics.moveTo(this, characterX, characterY, this.speed)
  }

  attack(characterX: number, characterY: number): Bullet {
    const bullet = new Bullet(this.scene, this.x, this.y, "enemyBullet")
    this.scene.physics.moveTo(bullet, characterX, characterY, this.bulletSpeed)

    this.nextFiring = this.scene.time.now + this.firingSpeed

    return bullet
  }

  canAttack(): boolean {
    return this.scene.time.now > this.nextFiring
  }

  private isDead(): boolean {
    return this.hp <= 0
  }

  private die() {
    this.scene.add.tween({
      duration: 1000,
      alpha: 0
    })
  }
}

export {
  Enemy
}
