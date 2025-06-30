import React, { useState } from "react";
import UserProfileEdit from "./UserProfileEdit";

function UserProfile({ user }) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState(user);

  if (!currentUser) {
    return <p>Please sign in to view your profile.</p>;
  }

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleUpdateSuccess = (updatedUser) => {
    setCurrentUser(updatedUser);
    setIsEditing(false);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">User Profile</h2>
      {isEditing ? (
        <UserProfileEdit user={currentUser} onUpdateSuccess={handleUpdateSuccess} />
      ) : (
        <div className="card p-3">
          <h4>{currentUser.name}</h4>
          <p><strong>Email:</strong> {currentUser.email}</p>
          {currentUser.bio && <p><strong>Bio:</strong> {currentUser.bio}</p>}
          <button className="btn btn-secondary mt-3" onClick={handleEditClick}>
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
