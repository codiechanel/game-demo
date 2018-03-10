import * as React from "react";
import * as Konva from "konva";
import MainLayer from "./MainLayer";
import Animator from "./Animator";
class SpaceDemo extends React.Component {
  state = {
    layer: null,
    callback: null
  };
  componentDidMount() {
    var container: HTMLElement = document.querySelector("#container");
    var stageWidth = container.offsetWidth-100;
    var stageHeight = container.offsetHeight-100
    let stage = new Konva.Stage({
      container: "container", // id of container <div>
      // width: stageWidth,
      // height: stageHeight
      width: 800,
      height: 400
    });
    // then create layer
    var layer = new Konva.Layer();
    // var hexagon = new Konva.RegularPolygon({
    //   x: stage.getWidth() / 2,
    //   y: stage.getHeight() / 2,
    //   sides: 6,
    //   radius: 70,
    //   fill: "red",
    //   stroke: "black",
    //   strokeWidth: 4
    // });
    // layer.add(hexagon);
    // add the layer to the stage
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
    anim.start();
    let fitStageIntoParentContainer = () => {
      var container: HTMLElement = document.querySelector("#container");

      // now we need to fit stage into parent

      var containerWidth = container.offsetWidth;
      console.log(
        "Matter",
        "fitStageIntoParentContainer",
        containerWidth,
        "window.innerWidth",
        window.innerWidth
      );

      console.log("Matter", "fitStageIntoParentContainer", containerWidth, "window.innerWidth", window.innerWidth);
      // to do this we need to scale the stage
      var scale = containerWidth / stageWidth;

      stage.width(container.offsetWidth-100);
      stage.height(container.offsetHeight-100);
      stage.scale({ x: scale, y: scale });
      stage.draw();
    };
    let fitStageIntoParentContainerOld = () => {
      var container: HTMLElement = document.querySelector("#container");

      // now we need to fit stage into parent

      var containerWidth = container.offsetWidth;
      console.log("Matter", "fitStageIntoParentContainer", containerWidth);
      // to do this we need to scale the stage
      var scale = containerWidth / stageWidth;

      stage.width(stageWidth * scale);
      stage.height(stageHeight * scale);
      stage.scale({ x: scale, y: scale });
      stage.draw();
    };
    // fitStageIntoParentContainer();
    // window.addEventListener("resize", fitStageIntoParentContainer);

    this.setState({ layer, callback: animCallback });
  }
  render() {
    let { layer, callback } = this.state;
    return (
      <div id="container" className="container">
        {layer && <MainLayer callback={callback} layer={layer} />}
      </div>
    );
  }
}

export default SpaceDemo;
