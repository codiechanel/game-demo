import * as React from "react";
import * as ReactDOM from "react-dom";
// import { Button } from 'material-ui';
import * as Material from "material-ui";
import * as style from "./style.module.css";
import "./index.css";
import "./styles.css";

// import style from './style.module.css'
import { Hello } from "./Hello";
import  App from './App'

function App2(props: any) {
  console.log("style", style.nice);

  return (
    <div>
      great cool
      <App />
      <Button2>great hmm</Button2>
    </div>
  );
}

const Button2: React.StatelessComponent<{}> = ({ children }) => (
  <button className={style.cool}>{children}</button>
);

ReactDOM.render(
  <App />,
  document.getElementById("root")
  // <Hello compiler="TypeScript" framework="React" />,
  // document.getElementById("root")
);
