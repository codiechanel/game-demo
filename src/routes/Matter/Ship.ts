import * as React from 'react';
import * as Konva from "konva";
import {Composite, Body,  Engine, Bodies, World } from 'matter-js'
class Ship  {
  private comp: Konva.Rect;
  private stage: Konva.Stage;
  private body: Matter.Body;

  constructor(layer,engine,  x, y) {
    this.stage = layer.getParent()
    this.body = Bodies.rectangle(x, y, 100, 50);


    World.add(engine.world, this.body);
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

  public show(dir) {
    let pos = this.body.position
    this.comp.x(pos.x);
    this.comp.y(pos.y);
    // Body.applyForce(this.body, this.body.position, { x: 0, y: (-0.001 * this.body.mass ) });
    Body.applyForce(this.body, this.body.position, { x: 0, y: (dir * 0.002 * this.body.mass ) });
    // This example applies force that counteracts default gravity on a body.

  }

  move(dir) {
    this.comp.y(this.comp.y() + dir * 5);


  }
}

export default Ship;
