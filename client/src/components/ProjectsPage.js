import React, { useEffect, useState } from "react";
import CollaborationForm from "./CollaborationForm";
import API_BASE_URL from "../config";

function ProjectsPage({ user }) {
  const [projects, setProjects] = useState([]);
  const [showFormForProject, setShowFormForProject] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/projects`)
      .then((res) => res.json())
      .then(setProjects);
  }, []);

  const handleContributeClick = (projectId) => {
    setShowFormForProject(projectId);
  };

  const handleFormClose = () => {
    setShowFormForProject(null);
  };

  const handleFormSuccess = (newCollaboration) => {
    alert("Collaboration submitted successfully!");
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Projects</h2>
      <ul className="list-group">
        {projects.map((project) => (
          <li key={project.id} className="list-group-item">
            <strong>{project.title}</strong> - {project.medium} <br />
            <small>Owner: {project.artist_name || "Unknown"}</small>
            {user && (
              <button
                className="btn btn-sm btn-outline-primary ms-3"
                onClick={() => handleContributeClick(project.id)}
              >
                Contribute
              </button>
            )}
            {showFormForProject === project.id && (
              <CollaborationForm
                projectId={project.id}
                artistId={user.id}
                onClose={handleFormClose}
                onSuccess={handleFormSuccess}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProjectsPage;
