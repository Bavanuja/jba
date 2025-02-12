// src/pages/PostJob.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TextField, Button, Box, Typography } from "@mui/material";
import Navbar from "./Navbar";

function PostJob() {
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  // Check if there's an existing job to edit in localStorage
  const storedEditJob = localStorage.getItem("editJob");
  const editJob = storedEditJob ? JSON.parse(storedEditJob) : null;

  // Setup initial form state. If editing, prefill with existing job data.
  const [jobData, setJobData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    about: ""
  });

  useEffect(() => {
    if (editJob) {
      setJobData(editJob);
    }
  }, [editJob]);

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editJob) {
        // Update the existing job instead of creating a new one.
        await axios.put(`http://localhost:3001/jobs/${editJob.id}`, {
          ...jobData,
          postedBy: loggedInUser.id,
          postedOn: new Date().toLocaleDateString(),
          // Retain existing applications if they exist
          applications: editJob.applications || []
        });
        // Clear the temporary edit job data after updating.
        localStorage.removeItem("editJob");
      } else {
        // Create a new job posting.
        await axios.post(`http://localhost:3001/jobs`, {
          ...jobData,
          postedBy: loggedInUser.id,
          postedOn: new Date().toLocaleDateString(),
          applications: []
        });
      }
      navigate("/myjobs");
    } catch (error) {
      console.error("Error submitting job:", error);
    }
  };

  return (
    <>
      <Navbar />
      <Box sx={{ display: "flex", justifyContent: "center", padding: "2rem" }}>
        <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: "600px" }}>
          <Typography variant="h4" textAlign="center" marginBottom={2}>
            {editJob ? "Edit Job" : "Post a New Job"}
          </Typography>
          <TextField
            label="Title"
            name="title"
            value={jobData.title}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Company"
            name="company"
            value={jobData.company}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Location"
            name="location"
            value={jobData.location}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Salary"
            name="salary"
            value={jobData.salary}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="About"
            name="about"
            value={jobData.about}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline
            rows={4}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }}>
            {editJob ? "Update Job" : "Post Job"}
          </Button>
        </form>
      </Box>
    </>
  );
}

export default PostJob;
