import MatterImage = Phaser.Physics.Matter.MatterImage;
import MatterSprite = Phaser.Physics.Matter.MatterSprite;
import GameObject = Phaser.GameObjects.GameObject;

class Ship {
  // public dir = 0
  public dir = new Phaser.Geom.Point(0, 0);
  // private readonly comp: Phaser.GameObjects.Image;
  private readonly WIDTH: number;
  public comp: MatterSprite | any;
  // public comp: any;
  // private scene: Phaser.Scene;
  private scene: any;
  constructor(scene, x, y) {
    this.scene = scene;
    this.WIDTH = scene.sys.canvas.width;

    // this.comp = scene.add.image(x, y, "ship").setOrigin(0,0)
    // this.comp = scene.matter.add.image(x, y, "ship").setOrigin(0,0)

    this.comp = scene.matter.add
      .sprite(x, y, "playerShip", "playerShip1_blue.png")
        .setName("player")
      .setOrigin(0, 0)



    console.log("Ship", "frameNamesIdle", this.comp.body.velocity);


    this.comp.setIgnoreGravity(true);
    this.comp.setBounce(true);
    this.comp.setFixedRotation();


    // this.comp.setVelocityY(30)

    // this.comp.setCollidesWith("enemy")

    console.log("Laser", "constructor");
  }
  get height() {
    return this.comp.height;
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
  }
  move() {
    let w = Phaser.Math.Wrap(this.comp.x, 0, this.WIDTH);
    // this.comp.thrustRight(1)
    this.comp.setX(w);

    // this.comp.setY(this.comp.y + this.dir.y * 5);
    this.comp.setVelocityX(this.dir.x * 5)
    this.comp.setVelocityY(this.dir.y * 5)
    // console.log("Ship", "frameNamesIdle", this.comp.body.velocity);
  }
}

export default Ship;
