import { Character } from "../objects/character"
import { Enemy } from "../objects/enemy"
import { TouchPanel } from "../objects/touchPanel"

class Game extends Phaser.Scene {
  private character!: Character
  private enemies!: Phaser.GameObjects.Group
  private touchPanel!: TouchPanel

  constructor() {
    super({ key: "game" })
  }

  create() {
    this.add.image(0, 0, "bg").setOrigin(0)
    this.character = new Character(this)
    this.enemies = this.add.group({ runChildUpdate: true })
    this.touchPanel = new TouchPanel(this)

    this.physics.add.overlap(this.character, this.enemies)
  }

  update() {
    this.character.move(this.touchPanel.getVelocity())
  }

  private makeEnemy() {
    this.enemies.add(new Enemy(this, 30, 60))
  }
}

export {
  Game
}
