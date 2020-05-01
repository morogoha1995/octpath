import { Collidable } from "./collidable"
import { WIDTH } from "../constants"

class Item extends Collidable {
  private content = "firingSpeed"
  private speed = 300

  constructor(scene: Phaser.Scene) {
    super(scene, Phaser.Math.Between(0, WIDTH), 0, "")

    this.setContent()
    this.setTexture(this.content)

    this.body.setVelocity(0, this.speed)
  }

  private setContent(): string {
    const itemNum = Phaser.Math.Between(0, 2)
    if (itemNum === 1)
      this.content = "scatter"
    else if (itemNum === 2)
      this.content = "enlarge"

    return this.content
  }

  getContent(): string {
    return this.content
  }
}

export {
  Item
}
