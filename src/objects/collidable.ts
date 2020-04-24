class Collidable extends Phaser.GameObjects.Sprite {
  body!: Phaser.Physics.Arcade.Body

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture)

    scene.add.existing(this)
    scene.physics.world.enable(this)
  }
}

export {
  Collidable
}
