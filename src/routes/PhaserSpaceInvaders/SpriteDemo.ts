///<reference path="../../types/phaser.d.ts"/>

import GameObject = Phaser.GameObjects.GameObject;
import Ship from "./Ship";

class SpriteDemo extends Phaser.Scene {
  private ship: Ship;
  /**
   * index signature
   * what the hell is this?
   */
  // [x: string]: any;
  [cursors: string]: any;

  preload() {
    this.load.image("ship", "assets/playerShip1_blue.png");
  }
  create() {
    this.cursors = this.input.keyboard.addKeys({
      leftKey: Phaser.Input.Keyboard.KeyCodes.LEFT,
      rightKey: Phaser.Input.Keyboard.KeyCodes.RIGHT
    });
    // const ship: GameObject = this.add.image(0, 0, "ship").setOrigin(0,0)
    this.ship = new Ship(this, 0,0)
    // ship.setVelocity(50, 50);
    // ship.setCollideWorldBounds(true);
  }
  update(timestep, delta) {
    const { leftKey, rightKey } = this.cursors;
    this.ship.move()
     // console.log("Scene1", "update", this.ship.x)
    if (leftKey.isDown) {
      this.ship.dir = -1
      // console.log("Scene1", "is down");
    } else if (rightKey.isDown) {
      // console.log("Scene1", "is up ");
      this.ship.dir = 1
    }
  }
}

export default SpriteDemo;
