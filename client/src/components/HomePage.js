import React from "react";
import { Link } from "react-router-dom";
import UserProfile from "./UserProfile";

function HomePage({ user }) {
  return (
    <div className="container mt-4">
      <h1>Welcome to ArtCollab</h1>
      <p>This is the home page of the ArtCollab application.</p>
      <p>Use the navigation bar to explore Artists, Projects, and Collaborations.</p>
      <ul>
        <li><Link to="/artists">Artists</Link></li>
        <li><Link to="/projects">Projects</Link></li>
        <li><Link to="/collaborations">Collaborations</Link></li>
      </ul>
      {user && <UserProfile user={user} />}
    </div>
  );
}

export default HomePage;
