import * as React from "react";
import {Composite,  Engine, Bodies, World } from 'matter-js'
// var Engine = MatterCanvas.Engine,
//     Render = MatterCanvas.Render,
//     World = MatterCanvas.World,
//     Bodies = MatterCanvas.Bodies;


class MatterCanvas extends React.Component {
  componentDidMount() {
    var engine = Engine.create()

// var render = Render.create({
//     element: document.body,
//     engine: engine
// });

// create two boxes and a ground
    var boxA = Bodies.rectangle(400, 200, 80, 80);
    var boxB = Bodies.rectangle(450, 50, 80, 80);
    var ground = Bodies.rectangle(400, 410, 810, 60, { isStatic: true });

// add all of the bodies to the world
    console.log("Matter", "componentDidMount", engine.world.gravity.y)
    engine.world.gravity.y = .01
    World.add(engine.world, [boxA, boxB, ground]);

// run the engine
    Engine.run(engine);

// run the renderer
// Render.run(render);
//     var container: HTMLElement = document.querySelector("#container");
    var canvas:any = document.querySelector("#canvas");
    // container.
    // var canvas = container.createElement('canvas'),
     var   context = canvas.getContext('2d');

    canvas.width = 800;
    canvas.height = 400;

    // document.body.appendChild(canvas);

    (function render() {
      var bodies = Composite.allBodies(engine.world);
      // console.log(bodies)

      window.requestAnimationFrame(render);

      context.fillStyle = '#000';
      context.fillRect(0, 0, canvas.width, canvas.height);

      context.beginPath();

      for (var i = 0; i < bodies.length; i += 1) {
        var vertices = bodies[i].vertices;

        context.moveTo(vertices[0].x, vertices[0].y);

        for (var j = 1; j < vertices.length; j += 1) {
          context.lineTo(vertices[j].x, vertices[j].y);
        }

        context.lineTo(vertices[0].x, vertices[0].y);
      }

      context.lineWidth = 1;
      context.strokeStyle = '#999';
      context.stroke();
    })();

  }
  render() {
    return (

      <div id="container" className="container">
        <canvas id="canvas" />

        </div>

    );
  }
}

export default MatterCanvas;
