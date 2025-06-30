import React, { useEffect, useState } from "react";
import API_BASE_URL from "../config";

function CollaborationsPage({ user }) {
  const [collaborations, setCollaborations] = useState([]);

  useEffect(() => {
    if (!user) return;
    fetch(`${API_BASE_URL}/collaborations?artist_id=${user.id}`)
      .then((res) => res.json())
      .then(setCollaborations);
  }, [user]);

  if (!user) {
    return <p>Please sign in to view your collaborations.</p>;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Collaborations</h2>
      {collaborations.length === 0 ? (
        <p>No collaborations found.</p>
      ) : (
        <div className="list-group">
          {collaborations.map((collab) => (
            <div key={collab.id} className="list-group-item mb-3 p-3 border rounded shadow-sm">
              <h5 className="mb-1">
                Project: <strong>{collab.project_title}</strong>
              </h5>
              <p className="mb-1">
                <strong>Owner:</strong> {collab.project_owner_name}
              </p>
              <p className="mb-1">
                <strong>Contributor:</strong> {collab.artist_name}
              </p>
              <p className="mb-1">
                <strong>Contribution Note:</strong> {collab.contribution_note}
              </p>
              <p className="mb-0">
                <strong>Tool Used:</strong> {collab.tool_used}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CollaborationsPage;