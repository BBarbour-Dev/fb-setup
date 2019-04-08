import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { compose } from "recompose";

import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

const Join = () => {
  return (
    <div>
      <h1>Join</h1>
      <JoinForm />
    </div>
  );
};

const JoinFormBase = props => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const [error, setError] = useState(null);

  const isInvalid =
    passwordOne !== passwordTwo ||
    passwordOne === "" ||
    email === "" ||
    username === "";

  const cleanUp = () => {
    setUsername("");
    setEmail("");
    setPasswordOne("");
    setPasswordTwo("");
    setError(null);
  };

  const onSubmit = e => {
    props.firebase
      .createNewUser(email, passwordOne)
      .then(authUser => {
        cleanUp();
        props.history.push(ROUTES.HOME);
      })
      .catch(err => {
        setError(err);
      });
    e.preventDefault();
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        name="username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        type="text"
        placeholder="Username"
      />
      <input
        name="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        type="email"
        placeholder="Email"
      />
      <input
        name="passwordOne"
        value={passwordOne}
        onChange={e => setPasswordOne(e.target.value)}
        type="password"
        placeholder="Password"
      />
      <input
        name="passwordTwo"
        value={passwordTwo}
        onChange={e => setPasswordTwo(e.target.value)}
        type="password"
        placeholder="Confirm Password"
      />
      <input disabled={isInvalid} type="submit" value="Join" />
      {error && <p>{error.message}</p>}
    </form>
  );
};

const JoinLink = () => {
  return (
    <p>
      Don't have an account? <Link to={ROUTES.JOIN}>Join today.</Link>
    </p>
  );
};

const JoinForm = compose(
  withRouter,
  withFirebase
)(JoinFormBase);

export default Join;

export { JoinForm, JoinLink };
