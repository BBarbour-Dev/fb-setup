import React, { useState, useEffect } from "react";
import { withAuthentication } from "../Session";

const Projects = props => {
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const uid = props.firebase.auth.currentUser.uid;
  console.log(projects);
  useEffect(() => {
    setLoading(true);
    const unsubscribe = props.firebase.db
      .collection("projects")
      .where("creator", "==", uid)
      .onSnapshot(snapshot => {
        let docs = [];
        snapshot.forEach(doc => {
          docs.push({ ...doc.data(), uid: doc.id });
        });
        setProjects(docs);
        setLoading(false);
      });
    return () => {
      unsubscribe();
    };
  }, []);

  return loading ? (
    <p>Loading...</p>
  ) : (
    <div>
      <ul>
        <h3>Projects</h3>
        {projects.map(project => {
          return (
            <li key={project.uid}>
              <strong>Name:</strong> {project.name} {" | "}
              <strong>Details:</strong> {project.details}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default withAuthentication(Projects);
