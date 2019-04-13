import React from "react";
import Projects from "./projects";

import { withAuthorization } from "../Session";

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <Projects />
    </div>
  );
};

const condition = userAuth => !!userAuth;

export default withAuthorization(condition)(Home);
