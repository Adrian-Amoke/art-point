import React, { useState } from "react";

function CollaborationForm({ projectId, artistId, onClose, onSuccess }) {
  const [contributionNote, setContributionNote] = useState("");
  const [toolUsed, setToolUsed] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    fetch("http://localhost:5555/collaborations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contribution_note: contributionNote,
        tool_used: toolUsed,
        artist_id: artistId,
        project_id: projectId,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to submit collaboration");
        }
        return res.json();
      })
      .then((data) => {
        onSuccess(data);
        onClose();
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <div className="collaboration-form">
      <h3>Contribute to Project</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="contributionNote" className="form-label">
            Contribution Note
          </label>
          <textarea
            id="contributionNote"
            className="form-control"
            value={contributionNote}
            onChange={(e) => setContributionNote(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="toolUsed" className="form-label">
            Tool Used
          </label>
          <input
            id="toolUsed"
            type="text"
            className="form-control"
            value={toolUsed}
            onChange={(e) => setToolUsed(e.target.value)}
            required
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-primary">
          Submit Contribution
        </button>
        <button type="button" className="btn btn-secondary ms-2" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default CollaborationForm;
