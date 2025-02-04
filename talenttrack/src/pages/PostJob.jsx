import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button, Paper, Typography, Stack } from "@mui/material";

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
      postedBy: loggedInUser?.email,
      id: Date.now(), // Assigning a unique ID using the current timestamp
      postedOn: new Date().toLocaleDateString(), // Storing the current date
    }
  );

  useEffect(() => {
    if (existingJob) {
      localStorage.removeItem("editJob");
    }
  }, []);

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    let allJobs = JSON.parse(localStorage.getItem("jobs")) || [];

    if (existingJob) {
      allJobs = allJobs.map((j) => (j.id === existingJob.id ? job : j)); // Use job ID to edit
    } else {
      allJobs.push(job);
    }

    localStorage.setItem("jobs", JSON.stringify(allJobs));

    navigate("/home");
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", padding: "2rem", width: "100vw" }}>
      <Paper sx={{ padding: 4, maxWidth: 600, width: "100%" }}>
        <Typography variant="h4" gutterBottom textAlign="center">
          {existingJob ? "Edit Job" : "Post a New Job"}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField label="Job Title" name="title" value={job.title} onChange={handleChange} required />
            <TextField label="Company Name" name="company" value={job.company} onChange={handleChange} required />
            <TextField label="Location" name="location" value={job.location} onChange={handleChange} required />
            <TextField label="Salary" name="salary" value={job.salary} onChange={handleChange} required />
            <TextField label="Job Description" name="about" value={job.about} onChange={handleChange} required multiline rows={4} />
            <Button type="submit" variant="contained" color="primary">
              {existingJob ? "Update Job" : "Post Job"}
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}

export default PostJob;
