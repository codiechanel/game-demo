import * as React from "react";
import Ship from "./Ship";
import * as Konva from "konva";
import ShipReact from "./ShipReact";
const RIGHT_ARROW = 39;
const LEFT_ARROW = 37;
const UP_ARROW = 38;
const DOWN_ARROW = 40;
const SPACE_BAR = 32;
class MainLayer extends React.Component<any, any> {
  private ship: Ship;
  private stage: Konva.Stage;
  state = {
    drops: [],
    shipDirection: 0,
  };
  private readonly layer: any | null | Konva.Layer;
  private flowers = [];
  private timer
  private engine: Matter.Engine | any;

  constructor(props: any, context: any) {
    super(props, context);
    this.stage = props.layer.getParent();
    this.layer = props.layer;
    this.engine = props.engine
    this.ship = new Ship(this.layer,this.engine,  10, 0);
  }

  componentDidMount() {
    window.addEventListener(
      "keyup",
      x => {
        if (x.keyCode != SPACE_BAR) {
          this.setState({ shipDirection: 0 });
        }
      },
      false
    );

    window.addEventListener(
      "keydown",
      x => {
        if (x.keyCode === SPACE_BAR) {

        }
        if (x.keyCode === UP_ARROW) {
          this.setState({ shipDirection: -1 });
        } else if (x.keyCode === DOWN_ARROW) {
          this.setState({ shipDirection: 1 });
        }
      },
      false
    );

    // this.timer = setInterval(() =>{
    //   let randY = Math.floor(Math.random() * 10);
    //
    //   this.flowers.push(
    //       new Flower(this.layer, this.stage.getWidth(), randY * 30)
    //   );
    //   this.setState({})
    // }, 3000);
  }

  render() {
    return (
      <>
        <ShipReact
          dir={this.state.shipDirection}
          item={this.ship}
          layer={this.layer}
          callback={this.props.callback}
        />
      </>
    );
  }
}

export default MainLayer;
