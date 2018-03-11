///<reference path="../../types/phaser.d.ts"/>
import MatterImage = Phaser.Physics.Matter.MatterImage;
import MatterSprite = Phaser.Physics.Matter.MatterSprite;

class Enemy {
  // public dir = 1
  public dir  = new Phaser.Geom.Point(0, 1);
  // private readonly comp: Phaser.GameObjects.Image;
  private readonly WIDTH: number;
  private readonly HEIGHT: number;
  public comp: MatterSprite | any;
  private scene: any;
  constructor(scene, x, y) {
    this.scene = scene
    this.HEIGHT = scene.sys.canvas.height
    this.WIDTH = scene.sys.canvas.width
    // this.comp = scene.add.image(x, y, "enemy").setOrigin(0,0)
    // this.comp = scene.matter.add.image(x, y, "enemy")
    this.comp = scene.matter.add
        .sprite(x, y, "playerShip", "enemyBlue1.png")
        .setName("enemy")
        .setOrigin(0, 0);
    this.comp.setOrigin(0,0)
    this.comp.setVelocityY(1)
    this.comp.setBounce(true)

    // this.comp.setIgnoreGravity(true)

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
  destroy() {
    this.scene.matter.world.remove(this.comp.body);
    this.comp.anims.play("shipDestroyed");
    setTimeout(() => {
      // this.comp.anims.stop(null, true);
      this.scene.children.remove(this.comp);
      // this.comp.anims.play("enemyIdle");
    }, 500);
  }
  move() {
    let w = Phaser.Math.Wrap(this.comp.y, 0, this.HEIGHT)
    // this.comp.setY(w)
    // this.comp.setY(w + this.dir.y * 5)

  }

}

export default Enemy