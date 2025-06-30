import React, { useEffect } from "react";
import { useFormik } from "formik";
import API_BASE_URL from "../config";
import { useParams, useHistory } from "react-router-dom";

function ProjectForm({ user, editMode }) {
  const { id } = useParams();
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      medium: "",
      artist_id: user ? user.id : "",
    },
    onSubmit: (values) => {
      const url = editMode ? `${API_BASE_URL}/projects/${id}` : `${API_BASE_URL}/projects`;
      const method = editMode ? "PATCH" : "POST";

      fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })
        .then((res) => res.json())
        .then((data) => {
          alert(editMode ? "Project updated successfully" : "Project added successfully");
          history.push("/my-projects");
        });
    },
  });

  useEffect(() => {
    if (editMode && id) {
      fetch(`${API_BASE_URL}/projects/${id}`)
        .then((res) => res.json())
        .then((data) => {
          formik.setValues({
            title: data.title || "",
            description: data.description || "",
            medium: data.medium || "",
            artist_id: data.artist_id || (user ? user.id : ""),
          });
        });
    }
  }, [editMode, id]);

  return (
    <form onSubmit={formik.handleSubmit} className="container mt-4">
      <h2 className="mb-3">{editMode ? "Edit Project" : "Add Project"}</h2>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Title:</label>
        <input id="title" name="title" type="text" className="form-control" onChange={formik.handleChange} value={formik.values.title} />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description:</label>
        <input id="description" name="description" type="text" className="form-control" onChange={formik.handleChange} value={formik.values.description} />
      </div>
      <div className="mb-3">
        <label htmlFor="medium" className="form-label">Medium:</label>
        <input id="medium" name="medium" type="text" className="form-control" onChange={formik.handleChange} value={formik.values.medium} />
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  );
}

export default ProjectForm;
