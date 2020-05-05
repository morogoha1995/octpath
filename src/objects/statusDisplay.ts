import { CharacterStatus } from "../../types/item"

class StatusDisplay {
  private currentStatusImg: any = {}

  constructor(scene: Phaser.Scene, status: CharacterStatus) {
    let x = 150
    const y = 360
    const xMargin = 60
    const degitMargin = 12
    for (let key in status) {
      scene.add.image(x, y, key)

      this.currentStatusImg[key] = scene.add.image(x - degitMargin, y - degitMargin, "0")
        .setScale(0.5)

      scene.add.image(x + degitMargin, y + degitMargin, "3")
        .setScale(0.5)

      x += xMargin
    }
  }

  update(key: string, currentStatus: number) {
    this.currentStatusImg[key].setTexture(`${currentStatus}`)
  }
}

export {
  StatusDisplay
}
