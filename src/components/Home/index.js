import React from "react";

import { withAuthorization } from "../Session";

const Home = () => {
  return <h1>Home</h1>;
};

const condition = userAuth => !!userAuth;

export default withAuthorization(condition)(Home);
