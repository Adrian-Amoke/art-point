import React, { useEffect, useState } from "react";
import { useFormik } from "formik";

function ProjectForm({ user }) {
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      medium: "",
      artist_id: user ? user.id : "",
    },
    onSubmit: (values) => {
      fetch("http://localhost:5555/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })
        .then((res) => res.json())
        .then((data) => {
          alert("Project added successfully");
        });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="container mt-4">
      <h2 className="mb-3">Add Project</h2>
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