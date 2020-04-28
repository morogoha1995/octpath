import { Character } from "../objects/character"
import { Enemy } from "../objects/enemy"
import { TouchPanel } from "../objects/touchPanel"
import { TitleText } from "../objects/titleText"
import { TextBtn } from "../objects/textBtn"
import { WIDTH, HEIGHT } from "../constants"

class Game extends Phaser.Scene {
  private character!: Character
  private enemies!: Phaser.GameObjects.Group
  private touchPanel!: TouchPanel
  private isStart = true
  private plusPopCount = 0

  constructor() {
    super({ key: "game" })
  }

  create() {
    this.add.image(0, 0, "bg").setOrigin(0)
    this.character = new Character(this)
    this.enemies = this.add.group({ runChildUpdate: true })
    this.touchPanel = new TouchPanel(this)

    this.physics.add.overlap(this.character, this.enemies, this.charOverlapEnemy, undefined, this)

    this.time.addEvent({
      delay: 3000,
      loop: true,
      callback: () => this.makeEnemies()
    })

    this.time.addEvent({
      delay: 30000,
      loop: true,
      callback: () => this.upDefficulty()
    })

    this.physics.world.setBounds(0, 0, WIDTH, HEIGHT)
  }

  update() {
    if (!this.isStart)
      return

    this.character.move(this.touchPanel.getVelocity())
  }

  private upDefficulty() {
    if (this.plusPopCount < 3)
      this.plusPopCount++
  }

  private makeEnemies() {
    const min = 1 + this.plusPopCount
    const max = 5 + this.plusPopCount
    const count = Phaser.Math.Between(min, max)

    for (let i = 0; i < count; i++) {
      this.enemies.add(new Enemy(this, this.character.x, this.character.y))
    }
  }

  // TODO
  private createTexts(text: string, color: string, startText: string) {
    const objs: any = []

    new TitleText(this, text, color)

    const startBtn = new TextBtn(this, 120, 200, "スタート", "blue")

    const soundBtn = new TextBtn(this, 260, 200, "音", "teal")

    const tweetBtn = new TextBtn(this, WIDTH / 2, 300, "ツイートする", "royalblue")
  }

  // TODO
  private charOverlapEnemy() {
    console.log("hit")
  }
}

export {
  Game
}
