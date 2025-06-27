import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import ArtistsPage from "./components/ArtistsPage";
import ProjectsPage from "./components/ProjectsPage";
import CollaborationsPage from "./components/CollaborationsPage";
import ProjectForm from "./components/ProjectForm";
import HomePage from "./components/HomePage";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("http://localhost:5555/artists", {
        headers: { "x-access-token": token },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.id) {
            setUser(data);
          } else {
            setUser(null);
            localStorage.removeItem("token");
          }
        })
        .catch(() => {
          setUser(null);
          localStorage.removeItem("token");
        });
    }
  }, []);

  return (
    <Router>
      <NavBar user={user} setUser={setUser} />
      <div className="container mt-3">
        <Switch>
          <Route exact path="/" render={(props) => <HomePage {...props} user={user} />} />
          <Route path="/artists" render={(props) => <ArtistsPage {...props} user={user} />} />
          <Route path="/projects" render={(props) => <ProjectsPage {...props} user={user} />} />
          <Route path="/collaborations" component={CollaborationsPage} />
          <Route path="/signin" render={(props) => <SignIn {...props} setUser={setUser} />} />
          <Route path="/signup" render={(props) => <SignUp {...props} setUser={setUser} />} />
          <Route path="/new-project" render={(props) => <ProjectForm {...props} user={user} />} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
