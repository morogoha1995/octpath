
class TouchPanel {
  private x = 60
  private y = 340
  private direction: any = {
    up: false,
    right: false,
    down: false,
    left: false
  }
  private arrow: any = {
    up: undefined,
    right: undefined,
    down: undefined,
    left: undefined
  }

  constructor(scene: Phaser.Scene) {
    scene.add
      .circle(this.x, this.y, 40, 0xFFFFFF, 0.6)
      .setInteractive()
      .on("pointermove", (e: PointerEvent) => this.determineDirection(e.x, e.y))
      .on("pointerout", () => {
        this.initDirection()
        this.switchAlpha()
      })

    this.addArrowImage(scene)
    this.addKeyboardEvent(scene)
  }

  getDirection(): any {
    return this.direction
  }

  private addKeyboardEvent(scene: Phaser.Scene) {
    const KEYBOARD_ARROW_NAMES: any = {
      up: {
        default: "ArrowUp",
        ie: "Up"
      },
      right: {
        default: "ArrowRight",
        ie: "Right"
      },
      down: {
        default: "ArrowDown",
        ie: "Down"
      },
      left: {
        default: "ArrowLeft",
        ie: "Left"
      }
    }

    scene.input.keyboard.on("keydown", (e: any) => {
      e.preventDefault()

      for (let key in KEYBOARD_ARROW_NAMES) {
        const k = KEYBOARD_ARROW_NAMES[key]

        if (e.key === k.default || e.key === k.ie)
          this.activateDirection(key)
      }

      this.switchAlpha()
    })

    scene.input.keyboard.on("keyup", (e: any) => {
      e.preventDefault()

      for (let key in KEYBOARD_ARROW_NAMES) {
        const k = KEYBOARD_ARROW_NAMES[key]

        if (e.key === k.default || e.key === k.ie)
          this.deactivateDirection(key)
      }

      this.switchAlpha()
    })
  }

  private addArrowImage(scene: Phaser.Scene) {
    const arrowMargin = 28

    this.arrow.up = scene.add
      .image(this.x, this.y - arrowMargin, "arrowUp")

    this.arrow.right = scene.add
      .image(this.x + arrowMargin, this.y, "arrowRight")

    this.arrow.down = scene.add
      .image(this.x, this.y + arrowMargin, "arrowDown")

    this.arrow.left = scene.add
      .image(this.x - arrowMargin, this.y, "arrowLeft")

    const arrowSize = 28
    const arrowAlpha = 0.4

    for (let key in this.arrow)
      this.arrow[key]
        .setDisplaySize(arrowSize, arrowSize)
        .setAlpha(arrowAlpha)
  }

  private initDirection() {
    for (let key in this.direction)
      this.direction[key] = false
  }

  private determineDirection(x: number, y: number) {
    const centerMargin = 12
    const up = this.y - centerMargin
    const right = this.x + centerMargin
    const down = this.y + centerMargin
    const left = this.x - centerMargin

    this.initDirection()

    if (y < up)
      this.activateDirection("up")
    else if (y > down)
      this.activateDirection("down")

    if (x > right)
      this.activateDirection("right")
    else if (x < left)
      this.activateDirection("left")

    this.switchAlpha()
  }

  private activateDirection(direction: string) {
    this.direction[direction] = true
  }

  private deactivateDirection(direction: string) {
    this.direction[direction] = false
  }

  private switchAlpha() {
    for (let key in this.direction)
      if (this.direction[key])
        this.arrow[key].setAlpha(1)
      else
        this.arrow[key].setAlpha(0.4)

  }
}

export {
  TouchPanel
}
