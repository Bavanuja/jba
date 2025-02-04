import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Typography, Button, Box, Paper } from "@mui/material";
import Navbar from "./Navbar";

function MyJobs() {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  useEffect(() => {
    const allJobs = JSON.parse(localStorage.getItem("jobs")) || [];
    const userJobs = allJobs.filter((job) => job.postedBy === loggedInUser?.email);
    setJobs(userJobs);
  }, []);

  const handleDelete = (jobTitle) => {
    let allJobs = JSON.parse(localStorage.getItem("jobs")) || [];
    
    // Remove the job from all jobs in localStorage
    allJobs = allJobs.filter((job) => !(job.postedBy === loggedInUser?.email && job.title === jobTitle));
    localStorage.setItem("jobs", JSON.stringify(allJobs));

    // Update state to reflect changes
    setJobs(jobs.filter((job) => job.title !== jobTitle));
  };

  const handleEdit = (job) => {
    // Store the job data in localStorage to pre-fill the edit form
    localStorage.setItem("editJob", JSON.stringify(job));

    // Navigate to PostJob page
    navigate("/postjob");
  };

  return (
    <div>
    <Navbar />
    <Box sx={{ display: "flex", justifyContent: "center", padding: "2rem",width:"95vw" }}>
      <Paper sx={{ padding: 4, maxWidth: 800, width: "100%" }}>
        <Typography variant="h4" textAlign="center" sx={{ marginBottom: "1rem" }}>
          My Posted Jobs
        </Typography>

        {jobs.length > 0 ? (
          jobs.map((job, index) => (
            <Card key={index} variant="outlined" sx={{ marginBottom: "1rem" }}>
              <CardContent>
                <Typography variant="h5">{job.title}</Typography>
                <Typography color="textSecondary">{job.company}</Typography>
                <Typography color="textSecondary">{job.location}</Typography>
                <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
                  <Button variant="contained" color="primary" onClick={() => handleEdit(job)}>
                    Edit
                  </Button>
                  <Button variant="contained" color="error" onClick={() => handleDelete(job.title)}>
                    Delete
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography textAlign="center">No jobs posted yet.</Typography>
        )}
      </Paper>
    </Box>
    </div>
  );
}

export default MyJobs;
