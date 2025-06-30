import React from "react";
import { Link } from "react-router-dom";
import UserProfile from "./UserProfile";

function HomePage({ user }) {
  return (
    <div className="container mt-4">
      <h1>Welcome to ArtCollab</h1>
      <p>This is the home page of the ArtCollab application.</p>
      <p>Use the navigation bar to explore your projects and collaborations.</p>
      <ul>
        {user ? (
          <>
            <li><Link to="/my-projects">My Projects</Link></li>
            <li><Link to="/my-collaborations">My Collaborations</Link></li>
          </>
        ) : (
          <li>Please log in to see your projects and collaborations.</li>
        )}
      </ul>
      {user && <UserProfile user={user} />}
    </div>
  );
}

export default HomePage;
