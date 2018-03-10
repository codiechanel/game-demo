import * as React from "react";
import * as Konva from "konva";
class SpriteDemo extends React.Component {
  state = {
    layer: null,
    callback: null,
    engine: null
  };
  componentDidMount() {
    var stageWidth = 800;
    var stageHeight = 400;

    let stage = new Konva.Stage({
      container: "container", // id of container <div>
      width: stageWidth,
      height: stageHeight
    });

    stage.on("click", () => {
      // console.log('usual click on ' + JSON.stringify(stage.getPointerPosition()));
    });
    // then create layer
    var layer = new Konva.Layer();
    // var imageObj = new Image();
    // imageObj.onload = function() {
    //   let image = new Konva.Image({
    //     x: 200,
    //     y: 0,
    //     image: imageObj,
    //     width: 536,
    //     height: 495
    //   });
    //   layer.add(image)
    // };
    // imageObj.src = 'mySprite.png'
    var animations = {
      idle: [0, 0, 268, 248, 268, 0, 268, 248, 0, 248, 268, 248],
      punch: [268, 248, 268, 248, 0, 496, 268, 248, 268, 496, 268, 248]
    };

    // var animations = {
    //   idle: [0, 0, 536, 495,
    //     536, 0, 536, 495,
    //     0, 495, 536, 495,
    //     536, 495, 536, 495,
    //     ],
    //   punch: [0, 990, 536, 495,
    //     536, 990, 536, 495,
    //     0, 1485, 536, 495,
    //     536, 1485, 536, 495]
    // };
    var imageObj = new Image();
    let config: any = {
      x: 0,
      y: 0,
      image: imageObj,
      animation: "idle",
      animations: animations,
      // lower is slower
      frameRate: 7,

      frameIndex: 0,
      listening: true
    };
    let blob = null;
    imageObj.onload = () => {
      blob = new Konva.Sprite(config);

      blob.on("mouseout", () => {
        console.log("mouse out", "");
        blob.setAnimation("idle");
      });

      // blob.on('mouseover',  () => {
      //
      // });

      layer.add(blob);
      blob.start();
      // trigger every where
      stage.on("contentClick", () => {
        // console.log('content click on ' + JSON.stringify(stage.getPointerPosition()));
        // console.log("mousy", "", )
        blob.setAnimation("punch");
        blob.on("frameIndexChange.button", () => {
          // console.log("index change", "",blob.frameIndex() )
          if (blob.frameIndex() === 2) {
            setTimeout(() => {
              blob.setAnimation("idle");
              blob.off(".button");
            }, 1000 / blob.frameRate());
          }
        });
      });
    };

    imageObj.src = "mySprite2.png";
    var hexagon = new Konva.RegularPolygon({
      x: stage.getWidth() / 2,
      y: stage.getHeight() / 2,
      sides: 6,
      radius: 70,
      fill: "red",
      stroke: "black",
      strokeWidth: 4,
      listening: true
    });
    // hexagon.on('mouseover',  () => {
    //   console.log("mousy", "", )
    // });
    // layer.add(hexagon);
    stage.add(layer);
    console.log("Matter", "componentDidMount", layer.getParent().getWidth());
    var amplitude = 150;
    // in ms
    var period = 2000;
    var centerX = stage.getWidth() / 2;
    var anim = new Konva.Animation(frame => {
      var time = frame.time,
        timeDiff = frame.timeDiff,
        frameRate = frame.frameRate;
      // var dist = velocity * (frame.timeDiff / 1000);
      // node.move(dist, 0);

      // hexagon.x(
      //   amplitude * Math.sin(frame.time * 2 * Math.PI / period) + centerX
      // );
    }, layer);
    anim.start();

    this.setState({ layer });
  }
  render() {
    return (
      <div className="container">
        <button>cool</button>
        <div id="container" />
      </div>
    );
  }
}

export default SpriteDemo;
