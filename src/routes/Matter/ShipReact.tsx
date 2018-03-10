import * as React from 'react';

class ShipReact extends React.Component<any, any> {
  private item: any;
  constructor(props: any, context: any) {
    super(props, context);
    this.item = props.item
  }
  componentDidMount() {
    this.props.callback.addListener(this)
  }

  public animate() {
    // console.log("FlowerReact", "animate",)
    // this.item.move(this.props.dir);
    this.item.show(this.props.dir)
  }

  render() {
    return null
  }
}

export default ShipReact;
