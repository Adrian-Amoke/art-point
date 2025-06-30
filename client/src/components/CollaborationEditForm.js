import React, { useState, useEffect } from "react";
import API_BASE_URL from "../config";
import { useParams, useHistory } from "react-router-dom";

function CollaborationEditForm({ user }) {
  const { id } = useParams();
  const history = useHistory();

  const [contributionNote, setContributionNote] = useState("");
  const [toolUsed, setToolUsed] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/collaborations/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch collaboration data");
        }
        return res.json();
      })
      .then((data) => {
        setContributionNote(data.contribution_note || "");
        setToolUsed(data.tool_used || "");
      })
      .catch(() => {
        setError("Failed to load collaboration data.");
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    fetch(`${API_BASE_URL}/collaborations/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contribution_note: contributionNote,
        tool_used: toolUsed,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to update collaboration");
        }
        return res.json();
      })
      .then(() => {
        alert("Collaboration updated successfully");
        history.push("/my-collaborations");
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <h2 className="mb-3">Edit Collaboration</h2>
      <div className="mb-3">
        <label htmlFor="contributionNote" className="form-label">Contribution Note:</label>
        <textarea
          id="contributionNote"
          className="form-control"
          value={contributionNote}
          onChange={(e) => setContributionNote(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="toolUsed" className="form-label">Tool Used:</label>
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
      <button type="submit" className="btn btn-primary">Update Collaboration</button>
    </form>
  );
}

export default CollaborationEditForm;
