import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserAuthContext } from "../Session";
import Logout from "../Logout";
import * as ROUTES from "../../constants/routes";
import * as ROLES from "../../constants/roles";

const Navigation = props => {
  const userAuth = useContext(UserAuthContext);
  return (
    <div>
      {userAuth ? (
        <NavigationAuth userAuth={userAuth} />
      ) : (
        <NavigationNonAuth />
      )}
    </div>
  );
};

const NavigationAuth = ({ userAuth }) => {
  return (
    <div>
      <ul className="navbar">
        <li>
          <Link to={ROUTES.LANDING}>Landing</Link>
        </li>
        <li>
          <Link to={ROUTES.HOME}>Home</Link>
        </li>
        <li>
          <Link to={ROUTES.ACCOUNT}>Account</Link>
        </li>
        {userAuth.role === ROLES.ADMIN && (
          <li>
            <Link to={ROUTES.ADMIN}>Admin</Link>
          </li>
        )}
        <li>
          <Logout />
        </li>
      </ul>
    </div>
  );
};

const NavigationNonAuth = () => {
  return (
    <ul className="navbar">
      <li>
        <Link to={ROUTES.LANDING}>Landing</Link>
      </li>
      <li>
        <Link to={ROUTES.LOGIN}>Login</Link>
      </li>
    </ul>
  );
};

export default Navigation;
