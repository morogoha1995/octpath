import { Enemy } from "./enemy"
import { WIDTH, HEIGHT } from "../constants"

class Enemies extends Phaser.GameObjects.Group {
  private popSpeed = 2000

  constructor(scene: Phaser.Scene) {
    super(scene, { runChildUpdate: true })
  }

  addPopEvent() {
    this.scene.time.addEvent({
      delay: this.popSpeed,
      loop: true,
      callback: () => this.makeEnemy()
    })
  }

  private makeEnemy() {
    console.log("pop")
    // 0 = top, 1 = right, 2 = bottom, 3 = left.
    const direction = Phaser.Math.Between(0, 3)
    const popPos = this.getPopPos(direction)

    // 7以上でShark
    const texture = Phaser.Math.Between(0, 9) >= 7 ? "shark" : "enemy"
    this.add(new Enemy(this.scene, popPos.x, popPos.y, texture))
  }

  private getPopPos(direction: number) {
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
}


export {
  Enemies
}
