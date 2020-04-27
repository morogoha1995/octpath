class TextBtn extends Phaser.GameObjects.Text {
  constructor(scene: Phaser.Scene, x: number, y: number, text: string, color: string) {
    super(scene, x, y, text, {
      color: "white",
      fontFamily: "Meiryo, sans-serif",
      fontSize: "24px",
      fontStyle: "bold"
    })

    this
      .setOrigin(0.5)
      .setBackgroundColor(color)
      .setAlpha(0)
      .setPadding(10, 6, 10, 6)

    scene.add.existing(this)
    scene.add.tween({
      targets: this,
      duration: 500,
      alpha: 1,
      onComplete: () => this.setInteractive()
    })
  }
}

export {
  TextBtn
}
