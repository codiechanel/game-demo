///<reference path="../../types/phaser.d.ts"/>
class Ship {
  public dir = 1
  // public dir  = new Phaser.Geom.Point(x, y);
  private readonly comp: Phaser.GameObjects.Image;
  private WIDTH: number;
  constructor(scene, x, y) {
    let height = scene.sys.canvas.height
    this.WIDTH = scene.sys.canvas.width
    this.comp = scene.add.image(x, height-75, "ship").setOrigin(0,0)

    console.log("Ship", "constructor", scene.sys.canvas.height)
  }

  get x() {
  return this.comp.x
  }
  get y() {
    return this.comp.y
  }
  move() {
    // this.comp.setX(this.comp.x + this.dir * 5)
    let w = Phaser.Math.Wrap(this.comp.x, 0, this.WIDTH)
    this.comp.setX(w + this.dir * 5)
    console.log("Ship", "move", w)
    // this.comp.y(this.comp.y() + dir * 5);
  }

}

export default Ship