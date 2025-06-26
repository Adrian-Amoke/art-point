import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import ArtistsPage from "./components/ArtistsPage";
import ProjectsPage from "./components/ProjectsPage";
import CollaborationsPage from "./components/CollaborationsPage";
import ArtistForm from "./components/ArtistForm";
import ProjectForm from "./components/ProjectForm";
import HomePage from "./components/HomePage";

function App() {
  return (
    <Router>
      <NavBar />
      <div className="container mt-3">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/artists" component={ArtistsPage} />
          <Route path="/projects" component={ProjectsPage} />
          <Route path="/collaborations" component={CollaborationsPage} />
          <Route path="/new-artist" component={ArtistForm} />
          <Route path="/new-project" component={ProjectForm} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
