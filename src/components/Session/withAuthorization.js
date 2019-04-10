import React, { useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";

import { UserAuthContext } from "./context";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

const withAuthorization = condition => Component => {
  const WithAuthorization = props => {
    const authUser = useContext(UserAuthContext);
    useEffect(() => {
      props.firebase.onAuthListener(
        userAuth => {
          if (!condition(userAuth)) {
            props.history.push(ROUTES.LOGIN);
          }
        },
        () => {
          props.history.push(ROUTES.LOGIN);
        }
      );
    }, []);
    const renderComponent = <Component {...props} />;
    return <>{condition(authUser) ? renderComponent : null}</>;
  };
  return compose(
    withRouter,
    withFirebase
  )(WithAuthorization);
};

export default withAuthorization;
