///<reference path="../../types/phaser.d.ts"/>
// import * as Phaser from 'phaser'
// import Scene = Phaser.Scene;
// import Scene   = Scene;

class SpriteDemo extends Phaser.Scene {
  /**
   * index signature
   * what the hell is this?
   */
  [x: string]: any;

  // private cursors: any;
  preload() {
    this.load.atlas("ninjas", "assets/ninja.png", "assets/ninja.json");
  }
  create() {
    this.cursors = this.input.keyboard.addKeys({
      leftKey: Phaser.Input.Keyboard.KeyCodes.LEFT,
      rightKey: Phaser.Input.Keyboard.KeyCodes.RIGHT
    });

    let capguy: any = this.add
      .sprite(0, 0, "ninjas", "Run__000.png")
      .setOrigin(0, 0);
    const frameNames = this.anims.generateFrameNames("ninjas", {
      start: 1,
      end: 9,
      zeroPad: 3,
      prefix: "Run__",
      suffix: ".png"
    });
    this.anims.create({
      key: "running",
      frames: frameNames,
      frameRate: 16,
      repeat: -1
    });
    capguy.anims.play("running");
  }
  update(timestep, delta) {
    const { leftKey, rightKey } = this.cursors;
    // console.log("Scene1", "update", )
    if (leftKey.isDown) {
      console.log("Scene1", "is down");
    } else if (rightKey.isDown) {
      console.log("Scene1", "is up ");
    }
  }
}

export default SpriteDemo;
