
import * as React from "react";

// import Game = Phaser.Game;
import SpriteDemo from "./SpriteDemo";

class PhaserSpaceInvaders extends React.Component {
  private game: Phaser.Game;
  componentDidMount() {
    let config = {
      type: Phaser.CANVAS,
      parent: "content",
      /**
       * i dnt know what this is for pixelArt
       */
      // pixelArt: true,
      width: 800,
      height: 400,
      physics: {
        default: "matter",
        matter: {
          enableSleeping: true,
          // gravity: { y: .5, x: 0 }
          gravity: { y: 0, x: 0 }
        }
        // arcade: { gravity: { y: 200 } }
      },
      // scene: [Scene1]
      scene: [SpriteDemo]
    };
    this.game = new Phaser.Game(config);
    console.log("PhaserSpaceInvaders", "componentDidMount", this.game);
  }
  render() {
    return (
      <div className="App">
        <p className="App-intro">
          To get , <code>src/App.tsx</code> and save to reload.
        </p>
        <div id="content" />
      </div>
    );
  }
}

export default PhaserSpaceInvaders;
