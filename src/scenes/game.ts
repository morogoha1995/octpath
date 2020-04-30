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
  private characterBullets!: Phaser.GameObjects.Group
  private enemies!: Phaser.GameObjects.Group
  private enemyBullets!: Phaser.GameObjects.Group
  private touchPanel!: TouchPanel
  private isStart = true
  private difficulty = 1
  private nextSpawnEnemy = 0

  constructor() {
    super({ key: "game" })
  }

  create() {
    this.add.image(0, 0, "bg").setOrigin(0)
    this.character = new Character(this)
    this.characterBullets = this.add.group({ runChildUpdate: true })
    this.enemies = this.add.group({ runChildUpdate: true })
    this.enemyBullets = this.add.group({ runChildUpdate: true })
    this.touchPanel = new TouchPanel(this)

    this.physics.add.overlap(this.character, this.enemyBullets, this.hitEnemyBulletsToCharacter, undefined, this)
    this.physics.add.overlap(this.characterBullets, this.enemies, this.hitCharacterBulletsToEnemy, undefined, this)

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


    this.updateCharacter()
    this.updateEnemies()
  }

  private updateCharacter() {
    this.character.move(this.touchPanel.getVelocity())

    if (this.character.canAttack())
      this.characterBullets.add(this.character.attack())
  }

  private updateEnemies() {
    this.enemiesAttack()
    this.spawnEnemy()
  }

  private enemiesAttack() {
    const characterX = this.character.x
    const characterY = this.character.y
    this.enemies.children.iterate((e: any) => {
      if (e.canAttack())
        this.enemyBullets.add(e.attack(characterX, characterY))
    })
  }

  private upDefficulty() {
    if (this.difficulty < 3)
      this.difficulty++
  }

  private spawnEnemy() {
    if (!this.canSpawnEnemy())
      return

    const enemyNum = Phaser.Math.Between(1, 10)
    let enemy: Enemy;
    if (enemyNum > 7)
      enemy = new Shark(this)
    else
      enemy = new Squid(this)

    this.enemies.add(enemy)
    this.calcNextSpawnEnemy()
  }

  private canSpawnEnemy(): boolean {
    return this.time.now > this.nextSpawnEnemy
  }

  private calcNextSpawnEnemy() {
    this.nextSpawnEnemy = this.time.now + Math.floor(3000 / this.difficulty)
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
  private hitEnemyBulletsToCharacter(c: any, e: any) {
    console.log("hit")
  }

  private hitCharacterBulletsToEnemy(cb: any, e: any) {
    cb.destroy()
    e.die()
  }
}

export {
  Game
}
