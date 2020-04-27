import { Character } from "../objects/character"
import { Enemy } from "../objects/enemy"
import { TouchPanel } from "../objects/touchPanel"
import { TitleText } from "../objects/titleText"
import { TextBtn } from "../objects/textBtn"
import { WIDTH, HEIGHT } from "../constants"
import { Enemies } from "../objects/enemies"

class Game extends Phaser.Scene {
  private character!: Character
  private enemies!: Enemies
  private touchPanel!: TouchPanel
  private isStart = true

  constructor() {
    super({ key: "game" })
  }

  create() {
    this.add.image(0, 0, "bg").setOrigin(0)
    this.character = new Character(this)
    this.enemies = new Enemies(this)
    this.touchPanel = new TouchPanel(this)

    this.physics.add.overlap(this.character, this.enemies, this.charOverlapEnemy, undefined, this)

    this.enemies.addPopEvent()
  }

  update() {
    if (!this.isStart)
      return

    this.character.move(this.touchPanel.getVelocity())
  }

  // TODO
  private createTexts(text: string) {
    const objs: any = []

    new TitleText(this, "octPath", "#F0674F")

    const startBtn = new TextBtn(this, 120, 200, "スタート", "blue")

    const soundBtn = new TextBtn(this, 260, 200, "音", "teal")
  }

  // TODO
  private charOverlapEnemy() {

  }
}

export {
  Game
}
