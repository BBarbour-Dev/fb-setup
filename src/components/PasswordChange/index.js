import React, { useState } from "react";
import { withFirebase } from "../Firebase";

const PasswordChangeForm = props => {
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const [error, setError] = useState(null);
  const [passwordChanged, setPasswordChanged] = useState(null);
  const isInvalid = passwordOne !== passwordTwo || passwordOne === "";
  const cleanUp = () => {
    setPasswordOne("");
    setPasswordTwo("");
    setError(null);
  };
  const onSubmit = e => {
    props.firebase
      .updateUserPassword(passwordOne)
      .then(() => {
        cleanUp();
        setPasswordChanged(true);
      })
      .catch(err => setError(err));
    e.preventDefault();
  };
  return (
    <form onSubmit={onSubmit}>
      {passwordChanged && <p>Your password has been changed!</p>}
      <input
        name="password"
        value={passwordOne}
        onChange={e => setPasswordOne(e.target.value)}
        type="password"
        placeholder="New Password"
      />
      <input
        name="confirmPassword"
        value={passwordTwo}
        onChange={e => setPasswordTwo(e.target.value)}
        type="password"
        placeholder="Confirm New Pasword"
      />
      <input disabled={isInvalid} type="submit" value="Change Password" />
      {error && <p>{error.message}</p>}
    </form>
  );
};

export default withFirebase(PasswordChangeForm);
