///<reference path="../../types/phaser.d.ts"/>
import MatterImage = Phaser.Physics.Matter.MatterImage;
import MatterSprite = Phaser.Physics.Matter.MatterSprite;

class Ship {
  // public dir = 0
  public dir = new Phaser.Geom.Point(0, 0);
  // private readonly comp: Phaser.GameObjects.Image;
  private readonly WIDTH: number;
  // public comp: MatterSprite;
  public comp: any;
  // private scene: Phaser.Scene;
  private scene: any;
  constructor(scene, x, y) {
    this.scene = scene;
    this.WIDTH = scene.sys.canvas.width;
    // this.comp = scene.add.image(x, y, "ship").setOrigin(0,0)
    // this.comp = scene.matter.add.image(x, y, "ship").setOrigin(0,0)
    this.comp = scene.matter.add
      .sprite(x, y, "playerShip", "playerShip1_blue.png")
      .setOrigin(0, 0);
    const frameNames = scene.anims.generateFrameNames("playerShip", {
      start: 1,
      end: 3,
      zeroPad: 1,
      prefix: "playerShip1_damage",
      suffix: ".png"
    });
    const frameNamesIdle = scene.anims.generateFrameNames("playerShip", {
      start: "",
      end: "",
      // zeroPad: 0,
      prefix: "playerShip1_blue",
      suffix: ".png"
    });
    console.log("Ship", "frameNamesIdle", frameNamesIdle)
    scene.anims.create({
      key: "shipDestroyed",
      frames: frameNames,
      frameRate: 16,
      repeat: -1
    });
    scene.anims.create({
      key: "shipIdle",
      frames: frameNamesIdle,
      frameRate: 16,
      // repeat: -1
    });

    this.comp.setIgnoreGravity(true);
    this.comp.setBounce(true);
    this.comp.setFixedRotation();

    // this.comp.setVelocityY(30)

    // this.comp.setCollidesWith("enemy")

    console.log("Enemy", "constructor");
  }

  get x() {
    return this.comp.x;
  }
  get y() {
    return this.comp.y;
  }
  destroy() {
    // this.anims.play("running");
    // console.log("Ship", "destroy", this.comp, this.scene);

    this.comp.anims.play("shipDestroyed");
    setTimeout(() => {
      // this.comp.anims.stop(null, true);
      this.comp.anims.play("shipIdle");
      // this.comp.play("playerShip")
      // playerShip
      // this.comp.anims.clear()
    }, 500);
    // this.comp.anims.stop()

    // this.scene.anims.play('shipDestroyed', )
    // this.comp.visible = false
    //  this.comp.destroy()
    //   this.comp.kill()
    //this.matter.world.remove(bodiesUnderPointer[0])

    // this.scene.physics.
    //this.comp.body.
  }
  move() {
    let w = Phaser.Math.Wrap(this.comp.x, 0, this.WIDTH);
    // this.comp.thrustRight(1)
    this.comp.setX(w + this.dir.x * 3);
    this.comp.setY(this.comp.y + this.dir.y * 3);
  }
}

export default Ship;
