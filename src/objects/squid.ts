import { Enemy } from "./enemy"

class Squid extends Enemy {
  constructor(scene: Phaser.Scene) {
    super(scene, "enemy")
  }
}

export {
  Squid
}
