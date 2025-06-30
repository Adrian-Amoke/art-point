import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CollaborationForm from "./CollaborationForm";
import API_BASE_URL from "../config";

function MyProjectsPage({ user }) {
  const [projects, setProjects] = useState([]);
  const [showFormForProject, setShowFormForProject] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    fetch(`${API_BASE_URL}/projects?artist_id=${user.id}`)
      .then((res) => res.json())
      .then(setProjects);
  }, [user]);

  const handleContributeClick = (projectId) => {
    setShowFormForProject(projectId);
  };

  const handleFormClose = () => {
    setShowFormForProject(null);
  };

  const handleFormSuccess = (newCollaboration) => {
    alert("Collaboration submitted successfully!");
  };

  const handleEdit = (projectId) => {
    navigate(`/projects/edit/${projectId}`);
  };

  const handleDelete = async (projectId) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_BASE_URL}/projects/${projectId}`, {
      method: "DELETE",
      headers: {
        "x-access-token": token,
      },
    });
    if (response.ok) {
      setProjects(projects.filter((p) => p.id !== projectId));
    } else {
      alert("Failed to delete project.");
    }
  };

  if (!user) {
    return <p>Please sign in to view your projects.</p>;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-3">My Projects</h2>
      {projects.length === 0 ? (
        <p>You have no projects.</p>
      ) : (
        <ul className="list-group">
          {projects.map((project) => (
            <li key={project.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <strong>{project.title}</strong> - {project.medium} <br />
                <small>Owner: {project.artist_name || "Unknown"}</small>
              </div>
              <div>
                <button className="btn btn-sm btn-primary me-2" onClick={() => handleEdit(project.id)}>
                  Edit
                </button>
                <button className="btn btn-sm btn-danger me-2" onClick={() => handleDelete(project.id)}>
                  Delete
                </button>
                <button className="btn btn-sm btn-outline-primary" onClick={() => handleContributeClick(project.id)}>
                  Contribute
                </button>
              </div>
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
      )}
    </div>
  );
}

export default MyProjectsPage;
