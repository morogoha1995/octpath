import { Character } from "../objects/character"
import { Enemy } from "../objects/enemy"
import { TouchPanel } from "../objects/touchPanel"
import { TitleText } from "../objects/titleText"
import { TextBtn } from "../objects/textBtn"
import { WIDTH, HEIGHT } from "../constants"
import { Shark } from "../objects/shark"
import { Squid } from "../objects/squid"
import { Item } from "../objects/item"
import { SoundBtn } from "../objects/soundBtn"
import { StatusDisplay } from "../objects/statusDisplay"
import { Score } from "../objects/score"

class Game extends Phaser.Scene {
  private character!: Character
  private characterBullets!: Phaser.GameObjects.Group
  private enemies!: Phaser.GameObjects.Group
  private enemyBullets!: Phaser.GameObjects.Group
  private items!: Phaser.GameObjects.Group
  private touchPanel!: TouchPanel
  private score!: Score
  private status!: StatusDisplay
  private isPlaying = true
  private difficulty = 1
  private nextSpawnEnemy = 0
  private isMute = false

  constructor() {
    super({ key: "game" })
  }

  create() {
    this.add.image(0, 0, "bg").setOrigin(0).setAlpha(0.8)
    this.character = new Character(this)
    this.characterBullets = this.add.group({ runChildUpdate: true })
    this.enemies = this.add.group({ runChildUpdate: true })
    this.enemyBullets = this.add.group({ runChildUpdate: true })
    this.items = this.add.group({ runChildUpdate: true })
    this.touchPanel = new TouchPanel(this)
    this.score = new Score(this)
    this.status = new StatusDisplay(this, this.character.getAllStatus())

    this.physics.add.overlap(this.character, this.enemyBullets, this.hitEnemyBulletsToCharacter, undefined, this)
    this.physics.add.overlap(this.characterBullets, this.enemies, this.hitCharacterBulletsToEnemy, undefined, this)
    this.physics.add.overlap(this.character, this.items, this.getItem, undefined, this)

    this.physics.world.setBounds(0, 0, WIDTH, HEIGHT)

    this.start()
  }

  init(data: any) {
    this.isMute = data.isMute || false
  }

  update() {
    if (!this.isPlaying)
      return


    this.updateCharacter()
    this.updateEnemies()
  }

  private getItem(c: any, item: any) {
    const itemContent = item.getContent()

    c.upgrade(itemContent)
    this.status.update(itemContent, c.getStatus(itemContent))

    item.destroy()
  }

  private updateCharacter() {
    this.character.move(this.touchPanel.getDirection())

    if (this.character.canAttack()) {
      const bullets = this.character.attack()
      for (const b of bullets)
        this.characterBullets.add(b)
    }
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
    this.items.add(new Item(this))

    if (this.difficulty < 5)
      this.difficulty++
  }

  private spawnEnemy() {
    if (!this.canSpawnEnemy())
      return

    const enemyNum = Phaser.Math.Between(1, 10)
    let enemy: Enemy
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
    this.nextSpawnEnemy = this.time.now + Math.floor(5000 / this.difficulty)
  }

  private createTexts() {
    const depth = 19

    const titleText = new TitleText(this, 120, "GAME OVER", "teal")
      .setDepth(depth)

    const btnY = 200
    new TextBtn(this, 120, btnY, "もう一回", "blue")
      .on("pointerdown", () => this.restart(titleText))
      .setDepth(depth)

    const soundBtn = new SoundBtn(this, btnY, this.isMute)
      .on("pointerdown", () => {
        this.isMute = !this.isMute
        soundBtn.switch(this.isMute)
      })
      .setDepth(depth)

    new TextBtn(this, WIDTH / 2, 300, "ツイートする", "royalblue")
      .setDepth(depth)
  }

  private restart(titleText: TitleText) {
    this.add.tween({
      targets: titleText,
      alpha: 0,
      duration: 200,
      repeat: 3,
      onComplete: () => this.scene.restart({ isMute: this.isMute })
    })
  }

  private switchMute() {

  }

  private hitEnemyBulletsToCharacter(c: any, eb: any) {
    if (c.getIsHurting())
      return

    eb.destroy()
    c.damaged()

    if (c.isDead())
      this.gameover()
  }

  private hitCharacterBulletsToEnemy(cb: any, e: any) {
    cb.destroy()
    e.die()
    this.score.update(e.getScore())
  }

  private start() {
    this.time.addEvent({
      delay: 15000,
      loop: true,
      callback: () => this.upDefficulty()
    })

    this.difficulty = 1
    this.nextSpawnEnemy = 0

    this.isPlaying = true
  }

  private gameover() {
    this.isPlaying = false
    this.physics.pause()
    this.time.removeAllEvents()
    this.createTexts()
  }
}

export {
  Game
}
