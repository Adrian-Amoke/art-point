import React, { useEffect, useState } from "react";

function CollaborationsPage() {
  const [collaborations, setCollaborations] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5555/collaborations")
      .then((res) => res.json())
      .then(setCollaborations);
  }, []);

  return (
    <div>
      <h2>Collaborations</h2>
      <ul>
        {collaborations.map((collab) => (
          <li key={collab.id}>
            {collab.artist_name} contributed with {collab.tool_used}: "{collab.contribution_note}"
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CollaborationsPage;