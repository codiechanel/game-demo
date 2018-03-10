///<reference path="../../types/phaser.d.ts"/>
import * as React from "react";

import Game = Phaser.Game;
import SpriteDemo from "./SpriteDemo";

class PhaserDemo2 extends React.Component {
  private game: Phaser.Game;
  componentDidMount() {
    let config =  {
      type: Phaser.CANVAS,
      parent: "content",
      /**
       * i dnt know what this is for pixelArt
       */
      // pixelArt: true,
      width: 800,
      height: 400,
      physics:    { default: "matter",
        // arcade: { gravity: { y: 200 } }
      },
      // scene: [Scene1]
       scene: [SpriteDemo]
    };
    this.game = new Game(config)
  }
  render() {
    return (

        <div className="App">
          <p className="App-intro">
            To get ,  <code>src/App.tsx</code> and save to reload.
          </p>
          <div id="content" >

          </div>
        </div>

    );
  }
}

export default PhaserDemo2;
