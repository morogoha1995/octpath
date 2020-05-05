import { Enemy } from "./enemy"

class Squid extends Enemy {
  constructor(scene: Phaser.Scene) {
    super(scene, "enemy")

    this.score = 50
  }

}

export {
  Squid
}
