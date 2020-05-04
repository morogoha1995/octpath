import { WIDTH } from "../constants"

class TitleText extends Phaser.GameObjects.Text {
  constructor(scene: Phaser.Scene, y: number, title: string, color: string) {
    super(scene, WIDTH / 2, y, title, {
      color: color,
      stroke: "white",
      strokeThickness: 6,
      fontFamily: "Meiryo, sans-serif",
      fontSize: "36px",
      fontStyle: "bold"
    })

    this
      .setOrigin(0.5)
      .setAlpha(0)

    scene.add.existing(this)
    scene.add.tween({
      targets: this,
      duration: 500,
      alpha: 1
    })
  }
}

export {
  TitleText
}
