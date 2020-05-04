import Phaser from "phaser"
import { Boot } from "./scenes/boot"
import { Game } from "./scenes/game"
import { WIDTH, HEIGHT } from "./constants"
import { Title } from "./scenes/title"

window.onload = () => {
  new Phaser.Game({
    type: Phaser.AUTO,
    width: WIDTH,
    height: HEIGHT,
    parent: 'app',
    physics: {
      default: "arcade"
    },
    backgroundColor: "#333333",
    scene: [
      Boot,
      Title,
      Game,
    ]
  })
}
