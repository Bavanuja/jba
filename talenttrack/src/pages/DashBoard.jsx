import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, Typography, Box, Paper } from "@mui/material";
import Navbar from "./Navbar";

function Dashboard() {
  const currentUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/jobs?postedBy=${currentUser.id}`)
      .then((res) => setJobs(res.data))
      .catch((err) => console.error("Error fetching dashboard jobs:", err));
  }, [currentUser.id]);

  return (
    <>
      <Navbar />
      <Box width="100vw" sx={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "2rem", backgroundColor: "#ffffff" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: "1rem" }}>
          Dashboard
        </Typography>

        {jobs.length === 0 ? (
          <Typography>No applications yet.</Typography>
        ) : (
          jobs.map((job) => (
            <Paper key={job.id} sx={{ marginBottom: "1rem", padding: "1rem", width: "80%" }}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {job.title}
                  </Typography>
                  <Typography color="textSecondary">{job.company}</Typography>
                  <Typography variant="subtitle1" sx={{ marginTop: "0.5rem" }}>
                    Applications:
                  </Typography>
                  {job.applications && job.applications.length > 0 ? (
                    job.applications.map((app, idx) => (
                      <Box key={idx} sx={{ padding: "0.5rem", border: "1px solid #ccc", borderRadius: 1, marginBottom: "0.5rem" }}>
                        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                          {app.applicantName} applied for {job.title}
                        </Typography>
                        <Typography variant="body2">Email: {app.applicantEmail}</Typography>
                        <Typography variant="body2">Phone: {app.applicantPhone}</Typography>
                        <Typography variant="body2">Address: {app.applicantAddress}</Typography>
                        {app.applicantLinkedIn && <Typography variant="body2">LinkedIn: {app.applicantLinkedIn}</Typography>}
                        <Typography variant="body2" sx={{ marginTop: "0.5rem" }}>Cover Letter: {app.applicantCoverLetter}</Typography>
                      </Box>
                    ))
                  ) : (
                    <Typography>No applications received yet.</Typography>
                  )}
                </CardContent>
              </Card>
            </Paper>
          ))
        )}
      </Box>
    </>
  );
}

export default Dashboard;
