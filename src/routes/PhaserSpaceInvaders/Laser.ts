///<reference path="../../types/phaser.d.ts"/>
import MatterImage = Phaser.Physics.Matter.MatterImage;

class Laser {
  // public dir = 1
  public dir  = new Phaser.Geom.Point(0, -1);
  // private readonly comp: Phaser.GameObjects.Image;
  private readonly WIDTH: number;
  private readonly HEIGHT: number;
  public comp: MatterImage;
  constructor(scene, x, y) {
    this.HEIGHT = scene.sys.canvas.height
    this.WIDTH = scene.sys.canvas.width
    // this.comp = scene.add.image(x, y, "enemy").setOrigin(0,0)
    this.comp = scene.matter.add.image(x, y, "laser")
    this.comp.setOrigin(0,0)
    // this.comp.setVelocityY(1)
    // this.comp.setBounce(true)

    this.comp.setIgnoreGravity(true)

  }
  get height() {
    return this.comp.height
  }
  get x() {
  return this.comp.x
  }
  get y() {
    return this.comp.y
  }
  move() {
   // let w = Phaser.Math.Wrap(this.comp.y, 0, this.HEIGHT)
    // this.comp.setY(w)
    this.comp.setY(this.comp.y + this.dir.y * 5)

  }

}

export default Laser