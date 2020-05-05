import { WIDTH } from "./../constants"

class Score {
  private x = WIDTH / 2
  private y = 30
  private current = 0
  private display: Phaser.GameObjects.Group

  constructor(scene: Phaser.Scene) {
    this.display = scene.add.group()
    this.setDisplay(0)
  }

  add(value: number) {
    this.current += value
    this.setDisplay(this.current)
  }

  private setDisplay(newScore: number) {
    this.display.clear(true, true)

    const newScoreStr = newScore.toString()
    const newScoreStrLen = newScoreStr.length
    let x = this.x
    const xMargin = 14

    if (newScoreStrLen >= 2)
      x -= xMargin * (newScoreStrLen / 4)

    for (let i = 0; i < newScoreStrLen; i++) {
      const newScoreSingleStr = newScoreStr[i]
      const img = this.display.scene.add.image(x, this.y, newScoreSingleStr)
      img
        .setScale(0.6)
        .setDepth(20)
      x += xMargin

      this.display.add(img)
    }
  }
}

export {
  Score
}
