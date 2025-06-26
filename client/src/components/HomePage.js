import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="container mt-4">
      <h1>Welcome to ArtCollab</h1>
      <p>This is the home page of the ArtCollab application.</p>
      <p>Use the navigation bar to explore Artists, Projects, and Collaborations.</p>
      <ul>
        <li><Link to="/">Artists</Link></li>
        <li><Link to="/projects">Projects</Link></li>
        <li><Link to="/collaborations">Collaborations</Link></li>
      </ul>
    </div>
  );
}

export default HomePage;
