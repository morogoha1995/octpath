class TouchPanel {
  private x = 60
  private y = 340
  private stick: Phaser.GameObjects.Arc
  private velocity = {
    x: 0,
    y: 0
  }

  constructor(scene: Phaser.Scene) {
    scene.add
      .circle(this.x, this.y, 30, 0xFFFFFF, 0.6)
      .setInteractive()
      .on("pointermove", (e: PointerEvent) => this.move(e.x, e.y))

    this.stick = scene.add.circle(this.x, this.y, 10, 0xFFFFFF)
  }

  getVelocity() {
    return this.velocity
  }

  private move(x: number, y: number) {
    this.stick.setPosition(x, y)
    this.velocity = {
      x: this.x - x,
      y: this.y - y
    }
  }
}

export {
  TouchPanel
}
