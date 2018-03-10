import * as React from "react";
import * as Konva from "konva";
import Animator from "./Animator";
import MainLayer from "./MainLayer";
import {Composite, Events, Engine, Bodies, World } from 'matter-js'
class Matter extends React.Component {
  state = {
    layer: null,
    callback: null,
    engine: null
  };
  componentDidMount() {
    var stageWidth = 800;
    var stageHeight = 400;
    /**
     * defaults
     * body mass = 5
     * gravity = 1
     * @type {Matter.Engine}
     */

    let engine = Engine.create()
    Events.on(engine, 'collisionStart',  event => {
       console.log("Matter", "collision" , event)
    })
    var ground = Bodies.rectangle(20, stageHeight, stageWidth, 60, { isStatic: true });
    World.add(engine.world, ground);

    var container: HTMLElement = document.querySelector("#container");

    let stage = new Konva.Stage({
      container: "container", // id of container <div>
      width: stageWidth,
      height: stageHeight

    });
    // then create layer
    var layer = new Konva.Layer();
    var hexagon = new Konva.RegularPolygon({
      x: stage.getWidth() / 2,
      y: stage.getHeight() / 2,
      sides: 6,
      radius: 70,
      fill: "red",
      stroke: "black",
      strokeWidth: 4
    });
    // layer.add(hexagon);
    stage.add(layer);
    console.log("Matter", "componentDidMount", layer.getParent().getWidth());
    var amplitude = 150;
    // in ms
    var period = 2000;
    var centerX = stage.getWidth() / 2;
    // let theDom = document.getElementById("sampler");
    let animCallback = new Animator();
    var anim = new Konva.Animation(frame => {
      var time = frame.time,
        timeDiff = frame.timeDiff,
        frameRate = frame.frameRate;
      // var dist = velocity * (frame.timeDiff / 1000);
      // node.move(dist, 0);
      animCallback.animate();
      // hexagon.x(
      //   amplitude * Math.sin(frame.time * 2 * Math.PI / period) + centerX
      // );
    }, layer);
    Engine.run(engine);
    anim.start();

    this.setState({ layer,engine,  callback: animCallback });
  }
  render() {
    let { engine, layer, callback } = this.state;
    return (
      <div id="container" className="container">
        {layer && <MainLayer callback={callback} engine={engine} layer={layer} />}
      </div>
    );
  }
}

export default Matter;
