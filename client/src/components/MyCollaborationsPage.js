import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../config";

function MyCollaborationsPage({ user }) {
  const [collaborations, setCollaborations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    fetch(`${API_BASE_URL}/collaborations?artist_id=${user.id}`)
      .then((res) => res.json())
      .then(setCollaborations);
  }, [user]);

  const handleEdit = (collabId) => {
    navigate(`/collaborations/edit/${collabId}`);
  };

  const handleDelete = async (collabId) => {
    if (!window.confirm("Are you sure you want to delete this collaboration?")) return;
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_BASE_URL}/collaborations/${collabId}`, {
      method: "DELETE",
      headers: {
        "x-access-token": token,
      },
    });
    if (response.ok) {
      setCollaborations(collaborations.filter((c) => c.id !== collabId));
    } else {
      alert("Failed to delete collaboration.");
    }
  };

  if (!user) {
    return <p>Please sign in to view your collaborations.</p>;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">My Collaborations</h2>
      {collaborations.length === 0 ? (
        <p>You have no collaborations.</p>
      ) : (
        <div className="list-group">
          {collaborations.map((collab) => (
            <div key={collab.id} className="list-group-item mb-3 p-3 border rounded shadow-sm d-flex justify-content-between align-items-center">
              <div>
                <h5 className="mb-1">
                  Project: <strong>{collab.project_title}</strong>
                </h5>
                <p className="mb-1">
                  <strong>Owner:</strong> {collab.project_owner_name}
                </p>
                <p className="mb-1">
                  <strong>Contribution Note:</strong> {collab.contribution_note}
                </p>
                <p className="mb-0">
                  <strong>Tool Used:</strong> {collab.tool_used}
                </p>
              </div>
              <div>
                <button className="btn btn-sm btn-primary me-2" onClick={() => handleEdit(collab.id)}>
                  Edit
                </button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(collab.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyCollaborationsPage;
