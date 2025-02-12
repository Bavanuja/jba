// src/pages/MyJobs.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, Typography, Button, Box, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function MyJobs() {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  useEffect(() => {
    axios
      .get(`http://localhost:3001/jobs?postedBy=${loggedInUser.id}`)
      .then((res) => setJobs(res.data))
      .catch((err) => console.error("Error fetching my jobs:", err));
  }, [loggedInUser.id]);

  const handleDelete = async (jobId) => {
    try {
      await axios.delete(`http://localhost:3001/jobs/${jobId}`);
      // Update state after deletion
      setJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  const handleEdit = (job) => {
    // For editing, we can temporarily save the job in localStorage
    localStorage.setItem("editJob", JSON.stringify(job));
    navigate("/postjob");
  };

  return (
    <>
      <Navbar />
      <Box sx={{ display: "flex", justifyContent: "center", padding: "2rem", width:"95vw" }}>
        <Paper sx={{ padding: 4, maxWidth: 800, width: "100%" }}>
          <Typography variant="h4" textAlign="center" sx={{ marginBottom: "1rem" }}>
            My Posted Jobs
          </Typography>
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <Card key={job.id} variant="outlined" sx={{ marginBottom: "1rem" }}>
                <CardContent>
                  <Typography variant="h5">{job.title}</Typography>
                  <Typography color="textSecondary">{job.company}</Typography>
                  <Typography color="textSecondary">{job.location}</Typography>
                  <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
                    <Button variant="contained" color="primary" onClick={() => handleEdit(job)}>
                      Edit
                    </Button>
                    <Button variant="contained" color="error" onClick={() => handleDelete(job.id)}>
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
    </>
  );
}

export default MyJobs;
