import Phaser from "phaser"
import { Boot } from "./scenes/boot"
import { Game } from "./scenes/game"
import { WIDTH, HEIGHT } from "./constants"
import { Title } from "./scenes/title"

window.onload = () => {
  const isBigScreen = window.innerWidth > 640 && window.innerHeight > 800

  const zoom = isBigScreen ? 2 : 1
  console.log(zoom)

  new Phaser.Game({
    type: Phaser.AUTO,
    width: WIDTH,
    height: HEIGHT,
    parent: 'app',
    zoom: zoom,
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
