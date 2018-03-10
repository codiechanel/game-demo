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
    this.item.move(this.props.dir);
    let flowers  = this.props.flowers
      if (flowers.length > 0) {
        for (let j = 0; j < flowers.length; j++) {
          if (this.item.hits(flowers[j])) {
            console.log("KonvaGreat", "hits", );
            // flowers[j].grow();
            // this.props.observer(this.item)
          }
        }
      }

  }
  render() {
    return null
  }
}

export default ShipReact;
