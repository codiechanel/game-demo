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
import Typography from 'material-ui/Typography'
import NavigateBeforeIcon from "material-ui-icons/NavigateBefore";
import NavigateNextIcon from "material-ui-icons/NavigateNext";
import { TweenMax, Power2, TimelineLite } from "gsap";
@observer
class App extends React.Component {
  mostStarred = observable.shallowMap(new Map());

  async getMostStarred(page = 1) {
    try {
      // let url =
      //   "https://api.github.com/search/repositories?q=stars:%3E1&sort=stars";
      let url =
        `https://api.github.com/search/repositories?q=stars:%3E15000&sort=stars&page=${page}`;
      let resp = await fetch(url);
      let respJson = await resp.json();
      console.log("respJson", respJson);
      runInAction(() => {
        this.mostStarred.clear()
        respJson.items.forEach(x => {
          let key = encodeURIComponent(x.full_name);
          let item = {
            id: x.id,
            full_name: x.full_name,
            stargazers_count: x.stargazers_count,
            forks_count: x.forks_count,
            description: x.description,
            owner: {
              avatar_url: x.owner.avatar_url
            },
            created_at: x.created_at,
            pageInfo: respJson,

            key: key
          };
          this.mostStarred.set(key, item);
        });
      });
      return true;
    } catch (error) {
      console.log("error most starred", error);
      return false;
    }
  }
  componentDidUpdate() {
    var tl = new TimelineLite();
    // tl.from(".cool", 6, { opacity: 0} )
    // tl.staggerFrom(".cool", 1, { opacity: 0} , 0.2)
    TweenMax.staggerFrom(".cool", 2, { opacity: 0} , 0.3)
    // TweenMax.from(".cool", 1, { scale: .5} , 0.2)


}
  mapper(o) {
    let avatar = (
      <Avatar>
        <FolderIcon />
      </Avatar>
    );
    if (o.owner && o.owner.avatar_url) {
      avatar = <Avatar src={o.owner.avatar_url} />;
    }
    let created_at_time = moment(o.created_at);

    let created_at = created_at_time.format("YYYY");

    const AvatarPanel = () => {
      return <div style={{display:"flex", flexDirection:"column",  alignItems: "center",  marginRight: 10,  }}>{avatar} 
         <Typography color="secondary">
         {created_at}
          </Typography>
      {/* <div style={{color:"white"}}>{created_at}</div> */}
      </div>
    }

    return (
      <ListItem
      className="cool"
        //  style={styles.item}
        // onClick={() => this.clickHandler(o)}
        key={o.key}
        button
      >
        <ListItemAvatar style={{ marginRight: 10 }}><AvatarPanel /></ListItemAvatar>
        <div style={{ flexDirection: "column" }}>
          <ListItemText primary={o.full_name} secondary={o.description} />
          
        </div>
        <ListItemSecondaryAction>
          <IconButton >
          <NavigateNextIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
  componentDidMount() {
    this.getMostStarred()

  }
    render() {
      let items: any  = this.mostStarred.values()
      let itemsPanel = null;
      if (items.length > 0) {
       items =  items.slice(0, 9);
        itemsPanel = <List>{items.map(this.mapper.bind(this))}</List>;
      }
      console.dir(items);
      return <div>nice
        {itemsPanel}
      </div>;
    }
  }

export default App  