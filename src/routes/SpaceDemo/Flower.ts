import * as React from "react";
import * as Konva from "konva";

class Flower {
  public r = 30;
  private comp: Konva.Ellipse;
  private dir: number = 1;
  private stage: Konva.Stage;

  constructor(layer, x, y) {

    this.stage = layer.getParent()
    this.comp = new Konva.Ellipse({
      radius: {
        x: this.r,
        y: this.r
      },
      x,
      y,
      fill: "yellow",
      stroke: "black",
      strokeWidth: 4,
      name: "flower"
      // hitFunc: function (context) {
      //     console.log("hitFunc", "hitFunc", context )
      //     // context.beginPath();
      //     // context.arc(0, 0, this.getOuterRadius() + 10, 0, Math.PI * 2, true);
      //     // context.closePath();
      //     // context.fillStrokeShape(this);
      // }
    });
    layer.add(this.comp);
  }

  public grow() {
    this.r += 2;

    let newR = {
      x: this.comp.radius().x + 2,
      y: this.comp.radius().y + 2
    };
    this.comp.radius(newR);
    // console.log("FlowerReact", "grow", this.comp.radius())
  }

  public shiftDown() {
    this.dir *= -1;
    // this.y += this.r;
    this.comp.y(this.comp.y() + this.r);
  }
  // get r() {
  //     return this.r
  // }
  get x() {
    return this.comp.x();
  }

  get y() {
    return this.comp.y();
  }

  move() {
    // console.log("Flower", "move",)
    this.comp.x(this.comp.x() -  3);
    // this.comp.x(this.comp.x() + this.dir * 5);
    // if (this.comp.x() > this.stage.getWidth() || this.comp.x() < 0) {
    //   this.shiftDown();
    // }

  }
}

export default Flower;
