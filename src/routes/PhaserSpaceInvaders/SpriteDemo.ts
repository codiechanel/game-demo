import GameObject = Phaser.GameObjects.GameObject;
import Ship from "./Ship";
import Enemy from "./Enemy";
import TimerEvent = Phaser.Time.TimerEvent;
import Laser from "./Laser";

class SpriteDemo extends Phaser.Scene {
  private ship: Ship;
  private cursors: any;
  private enemy: Enemy;
  enemyDestroyed = false;
  private height: number;
  private width: number;
  lasers = [];
  private laser: Laser;
  private fireSound: ISound;
  private hitSound: ISound;
  private starfield: Phaser.GameObjects.TileSprite;
  // private matter: any;
  /**
   * index signature
   * what the hell is this?
   */
  [dummy: string]: any;
  // [cursors: string]: any;

  preload() {
    this.load.audio("hit", "assets/sfx_zap.ogg");
    this.load.audio("fire", "assets/sfx_laser1.ogg");
    this.load.atlas("playerShip", "assets/ship.png", "assets/ship.json");
    this.load.image("starfield", "assets/blue.png");
    this.load.image("laser", "assets/laserBlue02.png");
    this.load.image("enemy", "assets/enemyBlue1.png");
    this.load.image("ship", "assets/playerShip1_blue.png");
    // this.load.image("beanstalk", "assets/beanstalk2.svg");
    this.load.svg("beanstalk", "assets/bird.svg");
  }
  create() {
    // setting Matter world bounds
    // this.matter.world.setBounds(0, -200, game.config.width, game.config.height + 200);
    const frameNames = this.anims.generateFrameNames("playerShip", {
      start: 1,
      end: 3,
      zeroPad: 1,
      prefix: "playerShip1_damage",
      suffix: ".png"
    });
    const frameNamesIdle = this.anims.generateFrameNames("playerShip", {
      start: "",
      end: "",
      // zeroPad: 0,
      prefix: "playerShip1_blue",
      suffix: ".png"
    });
    const frameNamesEnemyIdle = this.anims.generateFrameNames("playerShip", {
      start: "",
      end: "",
      // zeroPad: 0,
      prefix: "enemyBlue1",
      suffix: ".png"
    });
    this.anims.create({
      key: "shipDestroyed",
      frames: frameNames,
      frameRate: 16,
      yoyo: true,
      repeat: 1
      // repeat: -1
    });
    this.anims.create({
      key: "shipIdle",
      frames: frameNamesIdle,
      frameRate: 16,
      // hideOnComplete: true,
      repeat: 1
      // repeat: -1
    });
    this.anims.create({
      key: "enemyIdle",
      frames: frameNamesEnemyIdle,
      frameRate: 16,
      // hideOnComplete: true,
      repeat: 1
      // repeat: -1
    });


    this.starfield = this.add.tileSprite(0, 0, 800, 400, "starfield");
    this.starfield.setOrigin(0, 0);

    // this.add.image(0, 0, "beanstalk").setOrigin(0, 0);
    var config8 = {
      key: 'beanstalk',
      x: 0,
      y: -600,
      scale: { x: 4.5,  y: 4.5 }
    };

    let img: any  = this.make.image(config8)

        img.setOrigin(0,0)
    console.log("SpriteDemo", "img", img)

    // this.make.graphics()

    console.log("SpriteDemo", "create", this)

    let scoreText = this.add.text(10, 10, "Score", {
      font: "34px Arial",
      fill: "#fff"
    });

    this.fireSound = this.sound.add("fire");
    this.hitSound = this.sound.add("hit");
    this.height = this.sys.canvas.height;
    this.width = this.sys.canvas.width;
    this.cursors = this.input.keyboard.addKeys({
      leftKey: Phaser.Input.Keyboard.KeyCodes.LEFT,
      rightKey: Phaser.Input.Keyboard.KeyCodes.RIGHT,
      upKey: Phaser.Input.Keyboard.KeyCodes.UP,
      downKey: Phaser.Input.Keyboard.KeyCodes.DOWN
    });
    this.time.addEvent({
      delay: 500,
      callback: function() {
        if (this.enemyDestroyed) {
          let x = Math.round(Math.random() * 8 * 50);
          // console.log("callback", "callback", x)

          this.enemy = new Enemy(this, x, 0);
          this.enemyDestroyed = false;
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

    this.ship = new Ship(this, 300, this.height - 175);
    this.matter.world.on("collisionstart", (event, bodyA, bodyB) => {
      this.hitSound.play();
      let nameA = bodyA.gameObject.name;
      let nameB = bodyB.gameObject.name;
      if (nameA === "player" || nameB === "player") {
        this.ship.destroy();
      }
      if (nameA === "enemy" || nameB === "enemy") {
        // this.matter.world.remove(this.enemy.comp.body);
        this.enemyDestroyed = true;
        this.enemy.destroy();
        // this.children.remove(this.enemy.comp);
      }
      if (nameA === "laser") {
        this.matter.world.remove(bodyA);
        // bodyA.gameObject.destroy();
         this.children.remove(bodyA.gameObject);
      } else if (nameB === "laser") {
        this.matter.world.remove(bodyB);
        // bodyB.gameObject.destroy();
        this.children.remove(bodyB.gameObject);
      }
      console.log("SpriteDemo", bodyA.gameObject.name, bodyB);

      // console.log("collide", event, bodyA, bodyB)
      // bodyA.gameObject.setTint(0xff0000);
      // bodyB.gameObject.setTint(0x00ff00);
    });

    // this.ship = new Ship(this, 100,0)
    this.enemy = new Enemy(this, 100, 0);

    this.input.keyboard.on("keyup_D", () => {
      this.fireSound.play();
      this.lasers.push(
        new Laser(this, this.ship.x, this.ship.y - this.ship.height)
      );

      console.log("SpriteDemo", "key d");
    });

    // this.ship.comp.setCollidesWith(this.enemy.comp)
    // this.enemy.comp.setCollidesWith(this.ship.comp)
    // ship.setVelocity(50, 50);
    // ship.setCollideWorldBounds(true);
  }
  update(timestep, delta) {
    this.starfield.tilePositionY += 2;

    const { leftKey, rightKey, upKey, downKey } = this.cursors;

    this.ship.move();
    this.enemy.move();
    this.lasers.forEach(laser => {
      laser.move();
      if (laser.y < 0) {
        this.matter.world.remove(laser.comp.body);
        this.children.remove(laser.comp);
      }
    });

    if (this.enemy.y > this.height + 75) {
      this.enemyDestroyed = true;
      this.enemy.destroy();
    }
    if (leftKey.isDown) {
      this.ship.dir.x = -1;
      // console.log("Scene1", "is down");
    } else if (rightKey.isDown) {
      // console.log("Scene1", "is up ");
      this.ship.dir.x = 1;
    } else if (upKey.isDown) {
      // console.log("Scene1", "is up ");
      this.ship.dir.y = -1;
    } else if (downKey.isDown) {
      // console.log("Scene1", "is up ");
      this.ship.dir.y = 1;
    }
  }
}

export default SpriteDemo;
