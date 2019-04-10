import React from "react";

import { withFirebase } from "../Firebase";

const Logout = ({ firebase }) => {
  return (
    <button type="button" onClick={firebase.logoutUser}>
      Logout
    </button>
  );
};

export default withFirebase(Logout);
