// src/pages/PostJob.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Paper, Typography } from "@mui/material";

function PostJob() {
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  // Initial state for the job form
  const [jobData, setJobData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    about: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  // Check if there's an editJob stored in localStorage when the component mounts
  useEffect(() => {
    const editJob = localStorage.getItem("editJob");
    if (editJob) {
      setJobData(JSON.parse(editJob));
      setIsEditing(true);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        // Update the existing job using PUT request
        await axios.put(`http://localhost:3001/jobs/${jobData.id}`, {
          ...jobData,
          postedBy: loggedInUser.id,
        });
        // Clear the edit flag after update
        localStorage.removeItem("editJob");
      } else {
        // Create a new job using POST request
        await axios.post("http://localhost:3001/jobs", {
          ...jobData,
          postedBy: loggedInUser.id,
          postedOn: new Date().toLocaleDateString(),
        });
      }
      navigate("/myjobs");
    } catch (error) {
      console.error("Error posting/updating job:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        padding: "2rem",
        width: "95vw",
      }}
    >
      <Paper sx={{ padding: 4, maxWidth: 600, width: "100%" }}>
        <Typography
          variant="h4"
          textAlign="center"
          sx={{ marginBottom: "1rem" }}
        >
          {isEditing ? "Edit Job" : "Post a Job"}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={jobData.title}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Company"
            name="company"
            value={jobData.company}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Location"
            name="location"
            value={jobData.location}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Salary"
            name="salary"
            value={jobData.salary}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="About"
            name="about"
            value={jobData.about}
            onChange={handleChange}
            margin="normal"
            required
            multiline
            rows={4}
          />
          <Button variant="contained" type="submit" sx={{ marginTop: 2 }}>
            {isEditing ? "Update Job" : "Post Job"}
          </Button>
        </form>
      </Paper>
    </Box>
  );
}

export default PostJob;
