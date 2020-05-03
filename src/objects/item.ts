import { Collidable } from "./collidable"
import { WIDTH } from "../constants"
import { ItemContent } from "../../types/item"

class Item extends Collidable {
  private content: ItemContent = "firingSpeed"
  private speed = 30

  constructor(scene: Phaser.Scene) {
    super(scene, Phaser.Math.Between(0, WIDTH), 0, "")

    this.setContent()

    this
      .setTexture(this.content)
      .setDepth(8)

    this.body.setVelocity(0, this.speed)
  }

  private setContent() {
    const itemNum = Phaser.Math.Between(0, 2)
    if (itemNum === 1)
      this.content = "scatter"
    else if (itemNum === 2)
      this.content = "enlarge"
  }

  getContent(): ItemContent {
    return this.content
  }
}

export {
  Item
}
