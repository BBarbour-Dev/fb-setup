import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navigation from "../Navigation";
import Join from "../Join";
import Landing from "../Landing";
import Login from "../Login";
// import Logout from "../Logout";
// import PasswordForget from "../PasswordForget";
import Home from "../Home";
import Account from "../Account";
import Admin from "../Admin";

import * as ROUTES from "../../constants/routes";

const App = () => {
  return (
    <Router>
      <Navigation />

      <hr />

      <Route exact path={ROUTES.LANDING} component={Landing} />
      <Route path={ROUTES.JOIN} component={Join} />
      <Route path={ROUTES.LOGIN} component={Login} />
      <Route path={ROUTES.HOME} component={Home} />
      <Route path={ROUTES.ACCOUNT} component={Account} />
      <Route path={ROUTES.ADMIN} component={Admin} />
    </Router>
  );
};

export default App;
