import * as React from "react";
import * as Konva from "konva";
class MathDemo extends React.Component {
  componentDidMount() {
    var container: HTMLElement = document.querySelector("#container");
    var stageWidth = container.offsetWidth - 100;
    var stageHeight = container.offsetHeight - 100
    let stage = new Konva.Stage({
      container: "container", // id of container <div>
      // width: stageWidth,
      // height: stageHeight
      width: 400,
      height: 400
    });
    var layer = new Konva.Layer();
    let plots = 10;
    let increase = Math.PI * 2 / plots,
        angle = 0,
        x = 0,
        y = 0;
    for (let i = 0; i < plots; i++) {
      // var p = new Plot( stage );
      // p.setBackground( 'green' );
      // p.setDimensions( 40, 40 );

      x = 100 * Math.cos(angle) + 200;
      y = 100 * Math.sin(angle) + 200;
      const rect = new Konva.Rect({
        x, y,
        width: 40,
        height: 40,
        fill: 'red',
        stroke: 'black',
        strokeWidth: 5
      });
      layer.add(rect);
      // rect.offsetX(rect.width() / 2);
      // rect.offsetY(rect.height() / 2);

       // rect.rotate(45)
      // rect.rotate(Math.PI/9)
      // box.rotate(p5.prototype.radians(p5.prototype.atan2(y - 200, x - 200)));
      let radians = (degrees) => {
        return degrees * Math.PI / 180;
      };
      /**
       * this is correct formula
       * @type {number}
       */
      let rotation = radians(Math.atan2(y - 200, x - 200))
      // in degrees
      var angleDeg = Math.atan2(y - 200, x - 200) * 180 / Math.PI;
       // rect.rotate(rotation)
      rect.rotate(angleDeg)
      angle += increase;
    }

    stage.add(layer);
  }
  render() {
    return (

      <div id="container" className="container">
        <h3 style={{color: "white"}}>Demo</h3>

        </div>

    );
  }
}

export default MathDemo;
