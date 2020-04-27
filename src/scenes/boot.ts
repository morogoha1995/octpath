class Boot extends Phaser.Scene {

  constructor() {
    super({ key: "boot" })
  }

  preload() {
    this.load
      .image("bg", "assets/imgs/bg.jpg")
      .image("character", "assets/imgs/character.png")
      .image("shark", "assets/imgs/shark.png")
      .image("enemy", "assets/imgs/enemy.png")
  }

  create() {
    this.scene.start("game")
  }
}

export {
  Boot
}
