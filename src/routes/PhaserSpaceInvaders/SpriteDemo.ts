///<reference path="../../types/phaser.d.ts"/>

import GameObject = Phaser.GameObjects.GameObject;
import Ship from "./Ship";
import Enemy from "./Enemy";
import TimerEvent = Phaser.Time.TimerEvent;
import Laser from "./Laser";

class SpriteDemo extends Phaser.Scene {
  private ship: Ship;
  private cursors: any;
  private enemy: Enemy;
  enemyDestroyed = false
  private height: number;
  private width: number;
  lasers = []
  private laser: Laser;
  // private matter: any;
  /**
   * index signature
   * what the hell is this?
   */
  [dummy: string]: any;
  // [cursors: string]: any;

  preload() {
    this.load.atlas("playerShip", "assets/ship.png", "assets/ship.json");

    this.load.image("laser", "assets/laserBlue02.png");
    this.load.image("enemy", "assets/enemyBlue1.png");
    this.load.image("ship", "assets/playerShip1_blue.png");
  }
  create() {
    this.height = this.sys.canvas.height
    this.width = this.sys.canvas.width
    this.cursors = this.input.keyboard.addKeys({
      leftKey: Phaser.Input.Keyboard.KeyCodes.LEFT,
      rightKey: Phaser.Input.Keyboard.KeyCodes.RIGHT,
      upKey: Phaser.Input.Keyboard.KeyCodes.UP,
      downKey: Phaser.Input.Keyboard.KeyCodes.DOWN
    });
    this.time.addEvent({
      delay: 500,
      callback: function ()
      {


        if (this.enemyDestroyed) {
          let x = Math.round(Math.random() * 8 * 50)
          // console.log("callback", "callback", x)

          this.enemy = new Enemy(this, x,0)
          this.enemyDestroyed = false


        }
      },
      callbackScope: this,
      loop: true
    });
    // console.log("SpriteDemo", "create", this.matter.world)

    // this.matter.world.on('collisionend', function (event, bodyA, bodyB) {
    //   console.log("collisionend", event, bodyA, bodyB)
    // });
    // const ship: GameObject = this.add.image(0, 0, "ship").setOrigin(0,0)
    // this.matter.world.setBounds(0, 0, this.width, this.height - 100);

    this.ship = new Ship(this, 300,this.height-175)
    this.matter.world.on('collisionstart', (event, bodyA, bodyB) => {
      this.ship.destroy()
      // console.log("collide", event, bodyA, bodyB)
      // bodyA.gameObject.setTint(0xff0000);
      // bodyB.gameObject.setTint(0x00ff00);
    });

   // this.ship = new Ship(this, 100,0)
    this.enemy = new Enemy(this, 100,0)

    this.input.keyboard.on("keyup_D", () => {
      this.lasers.push(new Laser(this, this.ship.x,this.ship.y-this.ship.height))

      console.log("SpriteDemo", "key d", )
    });

    // this.ship.comp.setCollidesWith(this.enemy.comp)
    // this.enemy.comp.setCollidesWith(this.ship.comp)
    // ship.setVelocity(50, 50);
    // ship.setCollideWorldBounds(true);
  }
  update(timestep, delta) {
    const { leftKey, rightKey,upKey, downKey } = this.cursors;
    this.ship.move()
    this.enemy.move()
    this.lasers.forEach(laser => {
      laser.move()
      if (laser.y < 0) {
        this.matter.world.remove(laser.comp.body)
        this.children.remove(laser.comp)

      }
    })

    if (this.enemy.y > this.height-75) {
      // console.log("SpriteDemo", "update", this.anims)

      this.matter.world.remove(this.enemy.comp.body)
      this.children.remove(this.enemy.comp)
      this.enemyDestroyed = true
    }
    // console.log("SpriteDemo", "update", this.ship.comp.y)

     // console.log("Scene1", "update", this.ship.x)
    if (leftKey.isDown) {
      this.ship.dir.x = -1
      // console.log("Scene1", "is down");
    } else if (rightKey.isDown) {
      // console.log("Scene1", "is up ");
      this.ship.dir.x = 1
    }
    else if (upKey.isDown) {
      // console.log("Scene1", "is up ");
      this.ship.dir.y = -1
    } else if (downKey.isDown) {
      // console.log("Scene1", "is up ");
      this.ship.dir.y = 1
    }
  }
}

export default SpriteDemo;
