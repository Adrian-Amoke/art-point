import React, { useState, useEffect } from "react";
import API_BASE_URL from "../config";

function UserProfileEdit({ user, onUpdateSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        bio: user.bio || ""
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token"); // Adjust if token stored elsewhere
      const response = await fetch(`${API_BASE_URL}/artists/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update profile");
      }

      const updatedUser = await response.json();
      onUpdateSuccess(updatedUser);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <p>Please sign in to edit your profile.</p>;
  }

  return (
    <div className="container mt-4">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit} className="mb-3">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            className="form-control" 
            value={formData.name} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            className="form-control" 
            value={formData.email} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="bio" className="form-label">Bio</label>
          <textarea 
            id="bio" 
            name="bio" 
            className="form-control" 
            value={formData.bio} 
            onChange={handleChange} 
            rows="3" 
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}

export default UserProfileEdit;
