import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button, Paper, Typography, Stack } from "@mui/material";
import Navbar from "./Navbar";

function PostJob() {
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  
 
  const existingJob = JSON.parse(localStorage.getItem("editJob"));
  
  const [job, setJob] = useState(
    existingJob || {
      title: "",
      company: "",
      location: "",
      salary: "",
      about: "",
      postedBy: loggedInUser?.id, 
      postedOn: new Date().toLocaleDateString(),
      applications: [] 
    }
  );

  useEffect(() => {
    if (existingJob) {
      localStorage.removeItem("editJob");
    }
  }, [existingJob]);

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!loggedInUser) {
      alert("You must be logged in to post a job.");
      navigate("/");
      return;
    }
    
    try {
      if (existingJob) {
        
        await axios.put(`http://localhost:3001/jobs/${job.id}`, job);
      } else {
        
        await axios.post("http://localhost:3001/jobs", job);
      }
      alert("Job posted successfully!");
      navigate("/joblist");
    } catch (error) {
      console.error("Job posting error:", error);
      alert("An error occurred while posting the job.");
    }
  };

  return (
    <>
      <Navbar />
      <Box sx={{ display: "flex", justifyContent: "center", padding: "2rem", width: "95vw" }}>
        <Paper sx={{ padding: 4, maxWidth: 600, width: "100%" }}>
          <Typography variant="h4" gutterBottom textAlign="center">
            {existingJob ? "Edit Job" : "Post a New Job"}
          </Typography>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                label="Job Title"
                name="title"
                value={job.title}
                onChange={handleChange}
                required
              />
              <TextField
                label="Company Name"
                name="company"
                value={job.company}
                onChange={handleChange}
                required
              />
              <TextField
                label="Location"
                name="location"
                value={job.location}
                onChange={handleChange}
                required
              />
              <TextField
                label="Salary"
                name="salary"
                value={job.salary}
                onChange={handleChange}
                required
              />
              <TextField
                label="Job Description"
                name="about"
                value={job.about}
                onChange={handleChange}
                required
                multiline
                rows={4}
              />
              <Button type="submit" variant="contained" color="primary">
                {existingJob ? "Update Job" : "Post Job"}
              </Button>
            </Stack>
          </form>
        </Paper>
      </Box>
    </>
  );
}

export default PostJob;
