///<reference path="../../types/phaser.d.ts"/>

class SpriteDemo extends Phaser.Scene {
  /**
   * index signature
   * what the hell is this?
   */
  [x: string]: any;

  preload() {
    this.load.image("ship", "assets/playerShip1_blue.png");
  }
  create() {
    this.cursors = this.input.keyboard.addKeys({
      leftKey: Phaser.Input.Keyboard.KeyCodes.LEFT,
      rightKey: Phaser.Input.Keyboard.KeyCodes.RIGHT
    });
    const ship: any = this.add.image(0, 0, "ship").setOrigin(0,0)
    // ship.setVelocity(50, 50);
    // ship.setCollideWorldBounds(true);
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
