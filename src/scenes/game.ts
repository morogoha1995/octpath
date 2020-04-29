import { Character } from "../objects/character"
import { Enemy } from "../objects/enemy"
import { TouchPanel } from "../objects/touchPanel"
import { TitleText } from "../objects/titleText"
import { TextBtn } from "../objects/textBtn"
import { WIDTH, HEIGHT } from "../constants"
import { Shark } from "../objects/shark"
import { Squid } from "../objects/squid"

class Game extends Phaser.Scene {
  private character!: Character
  private enemies!: Phaser.GameObjects.Group
  private enemyBullets!: Phaser.GameObjects.Group
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
    this.enemyBullets = this.add.group({ runChildUpdate: true })
    this.touchPanel = new TouchPanel(this)

    this.physics.add.overlap(this.character, this.enemyBullets, this.charOverlapEnemy, undefined, this)

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
    this.checkEnemiesAttack()
  }

  private checkEnemiesAttack() {
    const characterX = this.character.x
    const characterY = this.character.y
    this.enemies.children.iterate((e: any) => {
      if (e.canAttack())
        this.enemyBullets.add(e.attack(characterX, characterY))
    })
  }

  private upDefficulty() {
    if (this.plusPopCount < 3)
      this.plusPopCount++
  }

  private makeEnemies() {
    // 何体生成するか
    const min = 1 + this.plusPopCount
    const max = 5 + this.plusPopCount
    const count = Phaser.Math.Between(min, max)

    let enemy: Enemy;
    for (let i = 0; i < count; i++) {
      const enemyNum = Phaser.Math.Between(1, 10)

      if (enemyNum > 7)
        enemy = new Shark(this)
      else
        enemy = new Squid(this)

      this.enemies.add(enemy)
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
