// src/pages/PostJob.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PostJob() {
  const navigate = useNavigate();
  const [jobData, setJobData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    about: "",
  });

  // Check if we are editing an existing job
  useEffect(() => {
    const editJob = localStorage.getItem("editJob");
    if (editJob) {
      setJobData(JSON.parse(editJob));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const editJob = localStorage.getItem("editJob");

    try {
      if (editJob) {
        // Editing: Use PUT or PATCH to update the existing job
        const jobToEdit = JSON.parse(editJob);
        await axios.put(`http://localhost:3001/jobs/${jobToEdit.id}`, jobData);
        localStorage.removeItem("editJob");
      } else {
        // Creating: Use POST to create a new job
        await axios.post("http://localhost:3001/jobs", jobData);
      }
      navigate("/myjobs");
    } catch (error) {
      console.error("Error submitting job:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="title"
        value={jobData.title}
        onChange={(e) => setJobData({ ...jobData, title: e.target.value })}
        placeholder="Job Title"
      />
      {/* Repeat for other fields */}
      <button type="submit">Submit</button>
    </form>
  );
}

export default PostJob;
