import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, Typography, Button, Box, Paper } from "@mui/material";

function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/jobs/${id}`)
      .then((res) => setJob(res.data))
      .catch((err) => console.error("Error fetching job details:", err));
  }, [id]);

  if (!job) {
    return (
      <Typography textAlign="center" sx={{ marginTop: "2rem" }}>
        Loading job details...
      </Typography>
    );
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center", padding: "2rem", width: "100vw" }}>
      <Paper sx={{ padding: 4, maxWidth: 600, width: "100%" }}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h5" sx={{ fontWeight: "bold", color: "#1976D2" }}>
              {job.title}
            </Typography>
            <Typography color="textSecondary" sx={{ fontSize: "1.1rem" }}>
              {job.company}
            </Typography>
            <Typography color="textSecondary">{job.location}</Typography>
            <Typography variant="body1" sx={{ marginTop: 2, fontWeight: "bold" }}>
              Salary: <span style={{ color: "#388E3C" }}>{job.salary}</span>
            </Typography>
            <Typography variant="body2" sx={{ marginTop: 2, lineHeight: 1.6 }}>
              <strong>About Job:</strong> {job.about}
            </Typography>
            <Typography variant="body2" sx={{ marginTop: 2 }}>
              <strong>Posted on:</strong> {job.postedOn}
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 3 }}>
              <Button variant="contained" color="success" component={Link} to={`/apply/${job.id}`}>
                Apply Now
              </Button>
              <Button variant="outlined" component={Link} to="/joblist">
                Back to Jobs
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Paper>
    </Box>
  );
}

export default JobDetails;
