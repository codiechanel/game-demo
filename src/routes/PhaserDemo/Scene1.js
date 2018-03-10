// import Sprite = Phaser.GameObjects.Sprite;
import * as Phaser from 'phaser'

class Scene1 extends Phaser.Scene {
  preload() {

    // this.load.setBaseURL('http://labs.phaser.io');
    this.load.on("progress", x => {
      console.log("Scene1", "on load", x);
    });
    this.load.setBaseURL("/");

    // this.load.atlas("ninjas", "assets/ninja3.png", "assets/ninja3.json");
    this.load.atlas("ninjas", "assets/ninja.png", "assets/ninja.json");

    this.load.image("ship", "assets/playerShip1_blue.png");
    this.load.image("enemy", "assets/enemyBlue1.png");
    this.load.image("sky", "assets/space3.png");
    this.load.image("logo", "assets/phaser3-logo.png");
    this.load.image("red", "assets/red.png");

    // this.load.spritesheet('dude',
    //     'src/games/firstgame/assets/dude.png',
    //     { frameWidth: 32, frameHeight: 48 }
    // );
  }

  update(timestep, delta) {
      const {leftKey, rightKey} = this.cursors;
    // console.log("Scene1", "update", )
      if (leftKey.isDown ) {
          console.log("Scene1", "is down", )
      }
      else if (rightKey.isDown ) {
          console.log("Scene1", "is up ", )
      }
  }

  create() {

      //  Create our keyboard controls.
      this.cursors = this.input.keyboard.addKeys({
          leftKey: Phaser.Input.Keyboard.KeyCodes.LEFT,
          rightKey: Phaser.Input.Keyboard.KeyCodes.RIGHT
      });

    let capguy = this.add.sprite(0, 0, 'ninjas', 'Run__000.png').setOrigin(0, 0);
    this.input.keyboard.on("keyup_D", event => {
      console.log("keyup_D", event);
    });
    // this.input.keyboard.on('keyup_space', event => {
    //     console.log("space", event, )
    // })

    var frameNames = this.anims.generateFrameNames("ninjas", {
      start: 1,
      end: 9,
      zeroPad: 3,
      prefix: "Run__",
      suffix: ".png"
    });
      var frameNamesSlide = this.anims.generateFrameNames("ninjas", {
          start: 1,
          end: 9,
          zeroPad: 3,
          prefix: "Slide__",
          suffix: ".png"
      });
      console.log("Scene1", "frameNamesSlide", frameNamesSlide)

    // let texture = this.textures.get("ninjas");

    this.anims.create({
      key: "running",
      frames: frameNames,
      frameRate: 16,
      repeat: -1
    });

      this.anims.create({
          key: "slide",
          frames: frameNamesSlide,
          frameRate: 16,
          repeat: -1
      });
       capguy.anims.play('running');

    // this.anims.create({ key: 'walk', frames: frameNames, frameRate: 10, repeat: -1 });
    const config = {
      key: "ninjas",
      // x: { randInt: [0, 800] },
      // y: { randInt: [0, 10] },
      x: 0,
      y: 0,
      // scale: { randFloat: [0.5, 1.5] },
      scale: 0.5,
      anims: "running"
    };

    /**
     * .setOrigin(0, 0) here is important
     * by default the image is drawn from center
     */
    // this.make.sprite(config).setOrigin(0, 0);
    // this.anims.play('slide');
    this.input.keyboard.on("keyup_D", () => {
      console.log("Scene1", "key up ");
        capguy.anims.play('slide');
        setTimeout(() => {
            capguy.anims.play('running');
        }, 1000 );
    });

    // this.add.image(400, 300, "sky");

    var particles = this.add.particles("red");

    var emitter = particles.createEmitter({
      speed: 100,
      scale: { start: 1, end: 0 },
      blendMode: "ADD"
    });

    console.log("Scene1", "this", this);

    // this.physics.events.on("dead", ()=>{
    //     console.log("Scene1", "deady", )
    // })
    //
    //   this.physics.world.events.on("killed", ()=>{
    //       console.log("Scene1", "deady", )
    //   })

    // this.on("killed", () => {
    //   console.log("Scene1", "killed");
    // });
    // this.events.on("destroy", () => {
    //   console.log("Scene1", "killed");
    // });
    // this.events.on("dead", () => {
    //   console.log("Scene1", "dead");
    // });
    // this.events.on("update", () => {
    //   // console.log("Scene1", "killed", )
    // });

    console.log("Scene1", "phsyics", this);

    // var logo = this.physics.add.image(400, 100, 'logo');
    //
    // logo.setVelocity(100, 200);
    // logo.setBounce(1, 1);
    // logo.setCollideWorldBounds(true);
    //
    // emitter.startFollow(logo);

    // var enemy = this.physics.add.image(400, 84, "enemy");
    let enemy = this.matter.add.image(400, 84, "enemy");
    // this.physics.add.image(500, 84, "enemy");
    enemy.setVelocity(50, 50);
    enemy.setBounce(1, 1);
    // enemy.setCollideWorldBounds(true);

    // enemy.outOfBoundsKill = true;
    // enemy.outOfBoundsDestroy = true;
    console.log("Scene1", "enemy", enemy);
    enemy.on("dead", () => {
      console.log("Scene1", "dead");
    });
    // this.physics.world.events.on('COLLIDE_EVENT', (event) => {
    //     this.collide(event);
    // });
    // enemy.onKill.add(() => {
    //     console.log("Scene1", "kill",)
    // })
    //   enemy.events.on("killed", () => {
    //   console.log("Scene1", "killed");
    // });
    //   enemy.events.on("destroy", () => {
    //       console.log("Scene1", "killed", )
    //   })

    // enemy.events.on('killed', () => {
    //     console.log("Scene1", "killed", )
    // });

    // ship.setVelocity(50, 50);
    // ship.setBounce(1, 1);
    // ship.setCollideWorldBounds(true);

    var ship = this.matter.add.image(99, 75, "ship");
    // this.add.image(99, 75, 'ship');
    // ship.setVelocity(50, 50);
    console.log("Scene1", "create", ship);
    ship.setVelocity(1, 1);
    ship.setBounce(1, 1);
    // ship.setCollideWorldBounds(true);
    emitter.startFollow(ship);
  }
}

export default Scene1;
