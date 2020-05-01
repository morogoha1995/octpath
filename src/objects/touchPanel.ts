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
      .circle(this.x, this.y, 40, 0xDDDDDD, 0.6)
      .setInteractive()
      .on("pointermove", (e: PointerEvent) => this.move(e.x, e.y))
      .on("pointerout", () => { this.move(this.x, this.y) })

    this.stick = scene.add.circle(this.x, this.y, 24, 0xFFDF9F, 0.6)
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
