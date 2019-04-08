import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";

import { JoinLink } from "../Join";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

const Login = () => {
  return (
    <div>
      <h1>Login</h1>
      <LoginForm />
      <JoinLink />
    </div>
  );
};

const LoginFormBase = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const isInvalid = password === "" || email === "";
  const cleanUp = () => {
    setEmail("");
    setPassword("");
    setError(null);
  };
  const onSubmit = e => {
    props.firebase
      .loginUser(email, password)
      .then(() => {
        cleanUp();
        props.history.push(ROUTES.HOME);
      })
      .catch(err => setError(err));
    e.preventDefault();
  };
  return (
    <form onSubmit={onSubmit}>
      <input
        name="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        type="email"
        placeholder="Email"
      />
      <input
        name="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
      />
      <input disabled={isInvalid} type="submit" value="Login" />
      {error && <p>{error.message}</p>}
    </form>
  );
};

const LoginForm = compose(
  withRouter,
  withFirebase
)(LoginFormBase);

export default Login;

export { LoginForm };
