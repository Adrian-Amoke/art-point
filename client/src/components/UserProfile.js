import React from "react";

function UserProfile({ user }) {
  if (!user) {
    return <p>Please sign in to view your profile.</p>;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-3">User Profile</h2>
      <div className="card p-3">
        <h4>{user.name}</h4>
        <p><strong>Email:</strong> {user.email}</p>
        {user.bio && <p><strong>Bio:</strong> {user.bio}</p>}
      </div>
    </div>
  );
}

export default UserProfile;
