import * as React from 'react';
import * as Konva from "konva";

class Ship  {
  private comp: Konva.Rect;
  private stage: Konva.Stage;

  constructor(layer, x, y) {
    this.stage = layer.getParent()
    this.comp = new Konva.Rect({
      x,
      y,
      width: 100,
      height: 50,
      fill: "green",
      stroke: "black",
      strokeWidth: 4
    });
    layer.add(this.comp);
  }
  get x() {
    return this.comp.x()
  }

  get y() {
    return this.comp.y()
  }


  private distance(x1, y1, x2, y2) {
    var a = x1 - x2;
    var b = y1 - y2;

    var c = Math.sqrt(a * a + b * b);
    return c;
  }

  public hits(flower) {
    // console.log("DropReact", "hits", flower)
    // var d = p.dist(this.x, this.y, flower.x, flower.y);
    let d = this.distance(this.x, this.y, flower.x, flower.y);
    // console.log("DropReact", "hhgjgkits",flower.radius());
    if (d < this.comp.getWidth()/2 + flower.r) {
    // if (d < this.r + flower.r) {
      return true;
    } else {
      return false;
    }
  }

  move(dir) {
    this.comp.y(this.comp.y() + dir * 5);
  }
}

export default Ship;
