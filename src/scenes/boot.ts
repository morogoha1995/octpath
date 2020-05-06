class Boot extends Phaser.Scene {
  constructor() {
    super({ key: "boot" })
  }

  preload() {
    this.load
      .image("title", "assets/imgs/title.png")
      .image("bg", "assets/imgs/bg.png")
      .image("character", "assets/imgs/character.png")
      .image("shark", "assets/imgs/shark.png")
      .image("enemy", "assets/imgs/enemy.png")
      .image("bullet", "assets/imgs/bullet.png")
      .image("x", "assets/imgs/x.png")
      .image("enemyBullet", "assets/imgs/enemy-bullet.png")
      .image("enlarge", "assets/imgs/items/enlarge.png")
      .image("firingSpeed", "assets/imgs/items/firing-speed.png")
      .image("scatter", "assets/imgs/items/scatter.png")
      .image("arrowUp", "assets/imgs/arrows/up.png")
      .image("arrowRight", "assets/imgs/arrows/right.png")
      .image("arrowDown", "assets/imgs/arrows/down.png")
      .image("arrowLeft", "assets/imgs/arrows/left.png")
      .image("1", "assets/imgs/numbers/1.png")
      .image("2", "assets/imgs/numbers/2.png")
      .image("3", "assets/imgs/numbers/3.png")
      .image("4", "assets/imgs/numbers/4.png")
      .image("5", "assets/imgs/numbers/5.png")
      .image("6", "assets/imgs/numbers/6.png")
      .image("7", "assets/imgs/numbers/7.png")
      .image("8", "assets/imgs/numbers/8.png")
      .image("9", "assets/imgs/numbers/9.png")
      .image("0", "assets/imgs/numbers/0.png")
      .audio("getItem", "assets/audios/get-item.mp3")
      .audio("attack", "assets/audios/attack.mp3")
      .audio("start", "assets/audios/start.mp3")
      .audio("dead", "assets/audios/dead.mp3")
  }

  create() {
    this.scene.start("title")
  }
}

export {
  Boot
}
