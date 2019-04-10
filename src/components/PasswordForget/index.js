import React, { useState } from "react";
import { Link } from "react-router-dom";

import { withFirebase } from "../Firebase";
import * as Routes from "../../constants/routes";

const PasswordForget = () => {
  return (
    <div>
      <h1>Forgot Password</h1>
      <PasswordForgetForm />
    </div>
  );
};

const PasswordForgetFormBase = props => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [resetSent, setResetSent] = useState(null);
  const cleanUp = () => {
    setEmail("");
    setError(null);
  };
  const isInvalid = email === "";

  const onSubmit = e => {
    props.firebase
      .resetUserPassword(email)
      .then(() => {
        cleanUp();
        setResetSent(true);
      })
      .catch(err => {
        setError(err);
      });

    e.preventDefault();
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        disabled={resetSent}
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder={resetSent ? "Check your email. Reset link sent." : "Email"}
      />
      <input disabled={isInvalid} type="submit" />
      {error && <p>{error.message}</p>}
    </form>
  );
};

const PasswordForgetLink = () => {
  return (
    <p>
      <Link to={Routes.PASSWORD_FORGET}>Forgot Password?</Link>
    </p>
  );
};

export default PasswordForget;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };
