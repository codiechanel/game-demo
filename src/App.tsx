import * as React from "react";
import { observable, runInAction, useStrict } from "mobx"; // 3.4.1
import { observer } from "mobx-react";
import List, {
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction
} from "material-ui/List";
import FolderIcon from "material-ui-icons/Folder";
import IconButton from "material-ui/IconButton";
import Button from "material-ui/Button";
import Paper from "material-ui/Paper";
import Avatar from "material-ui/Avatar";
import * as moment from "moment";
import Typography from "material-ui/Typography";
import NavigateBeforeIcon from "material-ui-icons/NavigateBefore";
import NavigateNextIcon from "material-ui-icons/NavigateNext";
import { TweenMax, Power2, TimelineLite } from "gsap";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Demo from './Demo'
// @observer
import "./App.css";
import Home from './Home'
import SpaceDemo from "./routes/SpaceDemo";
import MathDemo from "./routes/MathDemo";
import Angles from "./routes/Angles";
import Matter from "./routes/Matter";
import Orbit from "./routes/Orbit";
import MatterCanvas from "./routes/Matter/MatterCanvas";
import SpriteDemo from "./routes/SpriteDemo";
import PhaserDemo from "./routes/PhaserDemo";
import PhaserDemo2 from "./routes/PhaserDemo2";
class App extends React.Component {
  render() {
    return (
      // <div className="SpriteDemo-container">
      
      // <div className="container"  style={{
      //     padding: 30,
          
      //     alignItems: "center",
      //     justifyContent: "center"
      //   }}>
      // hello
      // </div>
      // </div>
      <Router>
        <div className="App-container">
          {/*<div id="stage-parent" >*/}
          <Switch>
            <Route exact path="/" render={props => <PhaserDemo2 {...props} />} />
            <Route exact path="/demo" render={props => <Demo {...props} />} />
            <Route render={props => <Home {...props} />} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
