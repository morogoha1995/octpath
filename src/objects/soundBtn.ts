import { TextBtn } from "./textBtn";

class SoundBtn extends TextBtn {
  xMark!: Phaser.GameObjects.Image

  constructor(scene: Phaser.Scene, y: number, isMute: boolean) {
    super(scene, 230, y, "音", "#00b379")

    this.xMark = scene.add.image(230, y, "x")
      .setAlpha(0)
      .setVisible(isMute)
      .setDepth(20)

    scene.add.tween({
      targets: this.xMark,
      duration: 500,
      alpha: 1,
    })
  }

  switch(isMute: boolean) {
    this.xMark.setVisible(isMute)
  }
}

export {
  SoundBtn
}
