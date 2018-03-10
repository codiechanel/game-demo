import * as React from "react";
import { observable, runInAction, useStrict } from "mobx"; // 3.4.1
import { observer } from "mobx-react";
import List, {
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction
} from "material-ui/List";
import fscreen from "fscreen";
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
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// @observer
class App extends React.Component {
  onFullscreen() {
    if (fscreen.fullscreenEnabled) {
      console.log("requestFullscreen");
      var elem = document.getElementById("root");

      fscreen.requestFullscreen(elem);
      //   elem.requestFullscreen()
    } else {
      console.log("not requestFullscreen");
    }
  }
  render() {
    return (
      <div className="container">
      {/* <div className="wrapper "> */}
      
        <div className="home-hero">
          <div className="feature">
            <h3>We like balloons</h3>
            <p>You can find all kinds of balloon related things here.</p>
          </div>
          <div className="special">
          <h3>Special Shapes</h3>
            {/* <Link to="/demo"><h3>Go to Demo</h3></Link> */}
            <p>Why are some of them so scary looking?</p>
            <Button
            // color="contrast"
            onClick={() => this.onFullscreen()}
          >
            fullscreen
          </Button>
          </div>
          <div className="amazing">
            <h3>10 things you discover </h3>
            <p>Number 8 will AMAZE you.</p>
          </div>
          <div className="news">
            <h3>Angry people at balloon fiestas</h3>
            <p>Hot air balloons. A bit weather sensitive. </p>
          </div>
          <div className="photos">
            <h3>Balloon photos</h3>
            <p>I have quite a few.</p>
        
          </div>
          {/* <div className="cta">
            <p>Sign up for more information about balloons. </p>
            <a className="spam-button" href="/spam-machine">
              Sign me up!
            </a>
          </div> */}
        </div>
        {/* </div> */}
      </div>
    );
  }
}

export default App;
