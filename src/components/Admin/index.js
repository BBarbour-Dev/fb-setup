import React, { useState, useEffect } from "react";
import { compose } from "recompose";

import { withFirebase } from "../Firebase";
import { withAuthorization } from "../Session";
import * as ROLES from "../../constants/roles";

const Admin = props => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    setLoading(true);
    props.firebase.users().onSnapshot(snapshot => {
      let fetchedUsers = [];
      snapshot.forEach(doc => {
        fetchedUsers.push({ ...doc.data(), uid: doc.id });
      });
      setUsers([...fetchedUsers]);
      setLoading(false);
      return () => {
        props.firebase.users().off();
      };
    });
  }, []);
  return (
    <div>
      <h1>Admin</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h3>Users</h3>
          <UsersList users={users} />
        </div>
      )}
    </div>
  );
};

const UsersListBase = ({ users, firebase }) => {
  const promoteToAdmin = (e, user) => {
    if (user.role === "ADMIN") {
      firebase
        .user(user.uid)
        .set({ role: "" }, { merge: true })
        .catch(err => console.log(err));
    } else {
      firebase
        .user(user.uid)
        .set({ role: "ADMIN" }, { merge: true })
        .catch(err => console.log(err));
    }
  };
  return (
    <ul style={{ listStyleType: "none" }}>
      {users.map(user => {
        return (
          users && (
            <li key={user.uid}>
              <span>
                <strong>Email:</strong> {user.email}
              </span>
              {" | "}
              <span>
                <strong>Username:</strong> {user.username}
              </span>
              {" | "}
              <span>
                <strong>Admin:</strong>
              </span>{" "}
              <input
                type="checkbox"
                onChange={e => promoteToAdmin(e, user)}
                style={{ display: "inline" }}
                name="admin"
                defaultChecked={user.role === "ADMIN" ? true : false}
              />
            </li>
          )
        );
      })}
    </ul>
  );
};

const UsersList = withFirebase(UsersListBase);

const condition = userAuth => {
  return userAuth && userAuth.role === ROLES.ADMIN;
};

export default compose(
  withAuthorization(condition),
  withFirebase
)(Admin);
