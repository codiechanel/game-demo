import * as React from "react";
import * as Konva from "konva";

class FlowerReact extends React.Component<any, any> {
  private item: any;

  constructor(props: any, context: any) {
    super(props, context);
    this.item = props.item;
    console.log("FlowerReact", "constructor", props)
  }

  componentDidMount() {
    this.props.callback.addListener(this)
  }

  public animate() {
    // console.log("FlowerReact", "animate",)
    this.item.move();
  }

  render() {
    // this.props.item.move();
    return null;
  }
}

export default FlowerReact;
