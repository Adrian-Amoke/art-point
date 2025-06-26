import React, { useEffect, useState } from "react";

function ProjectsPage() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5555/projects")
      .then((res) => res.json())
      .then(setProjects);
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Projects</h2>
      <ul className="list-group">
        {projects.map((project) => (
          <li key={project.id} className="list-group-item">
            {project.title} - {project.medium}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProjectsPage;
