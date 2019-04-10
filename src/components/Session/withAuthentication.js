import React, { useState, useEffect } from "react";

import { UserAuthContext } from "./context";
import { withFirebase } from "../Firebase";

const withAuthentication = Component => {
  const WithAuthentication = props => {
    const [userAuth, setUserAuth] = useState(null);
    useEffect(() => {
      props.firebase.onAuthListener(
        userAuth => {
          setUserAuth(userAuth);
        },
        () => {
          setUserAuth(null);
        }
      );
    }, []);
    return (
      <UserAuthContext.Provider value={userAuth}>
        <Component {...props} />
      </UserAuthContext.Provider>
    );
  };
  return withFirebase(WithAuthentication);
};

export default withAuthentication;
