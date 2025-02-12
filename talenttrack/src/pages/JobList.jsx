import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, Typography, Button, Box, Paper, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

function JobList() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/jobs")
      .then((res) => setJobs(res.data))
      .catch((err) => console.error("Error fetching jobs:", err));
  }, []);

  return (
    <>
      <Navbar />
      <Box sx={{ padding: "2rem", display: "flex", justifyContent: "center", width: "100vw" }}>
        <Paper sx={{ padding: "2rem", maxWidth: "800px", width: "100%" }}>
          <Typography variant="h4" gutterBottom sx={{ textAlign: "center", fontWeight: "bold", color: "#333" }}>
            Job Listings
          </Typography>
          {jobs.length === 0 ? (
            <Typography textAlign="center" color="textSecondary">
              No jobs available at the moment.
            </Typography>
          ) : (
            <Stack spacing={3}>
              {jobs.map((job) => (
                <Card key={job.id} sx={{ padding: 2, boxShadow: 3, transition: "0.3s", "&:hover": { transform: "scale(1.02)", boxShadow: 6 } }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: "bold", color: "#1976D2" }}>
                      {job.title}
                    </Typography>
                    <Typography color="textSecondary">{job.company}</Typography>
                    <Typography color="textSecondary">{job.location}</Typography>
                    <Typography variant="body2" sx={{ marginTop: 2 }}>
                      <strong>Posted on:</strong> {job.postedOn}
                    </Typography>
                    <Button variant="contained" color="primary" sx={{ marginTop: 2, width: "100%" }} component={Link} to={`/job/${job.id}`}>
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          )}
        </Paper>
      </Box>
    </>
  );
}

export default JobList;
