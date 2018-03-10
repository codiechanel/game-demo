import * as React from "react";
// import { Game } from "phaser";
import Scene1 from './Scene1'
import SpriteDemo from './SpriteDemo'
import Game = Phaser.Game;

class PhaserDemo extends React.Component<any, any> {
  private game;


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

    // this.game = new Phaser.Game(800, 600, Phaser.AUTO, "content");

    this.game = new Game(config)
    console.log("PhaserDemo", "componentDidMount", this.game)


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

export default PhaserDemo;
