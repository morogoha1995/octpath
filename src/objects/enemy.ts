import { Collidable } from "./collidable"
import { WIDTH, HEIGHT } from "../constants"

class Enemy extends Collidable {
  protected speed = 100

  constructor(scene: Phaser.Scene, characterX: number, characterY: number) {
    super(scene, 0, 0, "")

    // 生成する画面外の辺
    // 0 = top, 1 = right, 2 = bottom, 3 = left.
    const direction = Phaser.Math.Between(0, 3)
    const popPos = this.getSpawnPos(direction)

    // 7以上でShark
    const texture = Phaser.Math.Between(0, 9) >= 7 ? "shark" : "enemy"
    this.setPosition(popPos.x, popPos.y).setTexture(texture)

    if (texture === "shark")
      this.speed *= 2
    this.scene.physics.moveTo(this, characterX, characterY, this.speed)
  }

  update() {
    if (this.isOuted())
      this.destroy()
  }

  private getSpawnPos(direction: number) {
    const pos = {
      x: 0,
      y: 0
    }

    if (direction === 0 || direction === 2) {
      pos.x = Phaser.Math.Between(0, WIDTH)

      if (direction === 2)
        pos.y = HEIGHT
    } else if (direction === 1 || direction === 3) {
      pos.y = Phaser.Math.Between(0, HEIGHT)

      if (direction === 1)
        pos.x = WIDTH
    }

    return pos
  }

  private isOuted(): boolean {
    return this.body.right < 0 ||
      this.body.left > WIDTH ||
      this.body.bottom < 0 ||
      this.body.top > HEIGHT
  }
}

export {
  Enemy
}
