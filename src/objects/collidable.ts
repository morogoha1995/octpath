import { HEIGHT, WIDTH } from "../constants"

class Collidable extends Phaser.GameObjects.Sprite {
  body!: Phaser.Physics.Arcade.Body

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture)

    scene.add.existing(this)
    scene.physics.world.enable(this)
  }

  update() {
    if (this.isOuted())
      this.destroy()
  }

  private isOuted(): boolean {
    return this.body.right < 0 ||
      this.body.left > WIDTH ||
      this.body.bottom < 0 ||
      this.body.top > HEIGHT
  }
}

export {
  Collidable
}
