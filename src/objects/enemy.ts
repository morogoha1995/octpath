import { Collidable } from "./collidable"
import { WIDTH, HEIGHT } from "../constants"
import { Bullet } from "./bullet"

class Enemy extends Collidable {
  protected speed = 60
  protected bulletSpeed = 100
  protected firingInterval = 1800
  private nextFiring = 0

  constructor(scene: Phaser.Scene, texture: string) {
    super(scene, Phaser.Math.Between(0, WIDTH), 0, texture)

    this.body.setVelocity(0, this.speed)
  }

  attack(characterX: number, characterY: number): Bullet {
    const bullet = new Bullet(this.scene, this.x, this.y, "enemyBullet")
      .setDepth(10)
    this.scene.physics.moveTo(bullet, characterX, characterY, this.bulletSpeed)

    this.nextFiring = this.scene.time.now + this.firingInterval

    return bullet
  }

  canAttack(): boolean {
    return this.scene.time.now > this.nextFiring
  }

  die() {
    this.body.checkCollision.none = true
    this.body.setVelocity(0, 0)
    this.scene.add.tween({
      targets: this,
      duration: 1000,
      alpha: 0,
      onComplete: () => this.destroy()
    })
  }
}

export {
  Enemy
}
