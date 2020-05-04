class Boot extends Phaser.Scene {
  constructor() {
    super({ key: "boot" })
  }

  preload() {
    this.load
      .image("title", "assets/imgs/title.png")
      .image("bg", "assets/imgs/bg.jpg")
      .image("character", "assets/imgs/character.png")
      .image("shark", "assets/imgs/shark.png")
      .image("enemy", "assets/imgs/enemy.png")
      .image("bullet", "assets/imgs/bullet.png")
      .image("x", "assets/imgs/x.png")
      .image("enemyBullet", "assets/imgs/enemy-bullet.png")
      .image("enlarge", "assets/imgs/items/enlarge.png")
      .image("firingSpeed", "assets/imgs/items/firing-speed.png")
      .image("scatter", "assets/imgs/items/scatter.png")
      .image("arrowUp", "assets/imgs/arrow/up.png")
      .image("arrowRight", "assets/imgs/arrow/right.png")
      .image("arrowDown", "assets/imgs/arrow/down.png")
      .image("arrowLeft", "assets/imgs/arrow/left.png")
  }

  create() {
    this.scene.start("title")
  }
}

export {
  Boot
}
