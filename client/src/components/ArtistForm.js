import React from "react";
import { useFormik } from "formik";

function ArtistForm() {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      bio: "",
    },
    onSubmit: (values) => {
      fetch("http://localhost:5555/artists", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })
        .then((res) => res.json())
        .then((data) => {
          alert("Artist added successfully");
        });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="container mt-4">
      <h2 className="mb-3">Add Artist</h2>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name:</label>
        <input id="name" name="name" type="text" className="form-control" onChange={formik.handleChange} value={formik.values.name} />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email:</label>
        <input id="email" name="email" type="email" className="form-control" onChange={formik.handleChange} value={formik.values.email} />
      </div>
      <div className="mb-3">
        <label htmlFor="bio" className="form-label">Bio:</label>
        <input id="bio" name="bio" type="text" className="form-control" onChange={formik.handleChange} value={formik.values.bio} />
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  );
}

export default ArtistForm;