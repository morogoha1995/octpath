import { TitleText } from "../objects/titleText"
import { TextBtn } from "../objects/textBtn"
import { SoundBtn } from "../objects/soundBtn"

class Title extends Phaser.Scene {
  isMute = false

  constructor() {
    super({ key: "title" })
  }

  create() {
    this.add.image(0, 0, "title").setOrigin(0)
    this.createTexts()
  }

  private createTexts() {
    const titleText = new TitleText(this, 290, "octPath", "orange")

    this.add.tween({
      targets: titleText,
      duration: 600,
      y: titleText.y - 5,
      scale: 0.9,
      repeat: -1,
      yoyo: true,
    })

    const btnY = 350
    new TextBtn(this, 120, btnY, "スタート", "blue")
      .on("pointerdown", () => this.start(titleText))

    const soundBtn = new SoundBtn(this, btnY, false)
      .on("pointerdown", () => {
        this.isMute = !this.isMute
        soundBtn.switch(this.isMute)
      })
  }

  private start(titleText: Phaser.GameObjects.Text) {
    this.sound.mute = this.isMute
    this.sound.play("start")
    this.add.tween({
      targets: titleText,
      alpha: 0,
      duration: 200,
      repeat: 3,
      onComplete: () => this.scene.start("game", { isMute: this.isMute })
    })
  }
}

export {
  Title
}
