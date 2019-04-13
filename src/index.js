import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import App from "./components/App/index";
import Firebase, { FirebaseContext } from "./components/Firebase";

console.log(process.env.REACT_APP_API_KEY);
ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById("root")
);
