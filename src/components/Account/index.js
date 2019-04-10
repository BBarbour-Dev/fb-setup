import React from "react";

import PasswordChangeForm from "../PasswordChange";
import { withAuthorization } from "../Session";

const Account = () => {
  return (
    <div>
      <h1>Account</h1>
      <PasswordChangeForm />
    </div>
  );
};

const condition = userAuth => (userAuth ? true : false);

export default withAuthorization(condition)(Account);
