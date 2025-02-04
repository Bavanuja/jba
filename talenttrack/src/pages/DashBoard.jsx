import { useState, useEffect } from "react";
import { Card, CardContent, Typography, Button, Box, Paper } from "@mui/material";
import Navbar from "./Navbar";

function Dashboard() {
  const currentUser = JSON.parse(localStorage.getItem("loggedInUser"));
  console.log(currentUser);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const storedApplications = JSON.parse(localStorage.getItem("applications")) || [];
    const userApplications = storedApplications.filter(app => app.jobPosterId === currentUser.id);
    setApplications(userApplications);
  }, []);

  return (
    <div>
    <Navbar />
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "2rem" }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: "1rem" }}>Dashboard</Typography>

      {applications.length === 0 ? (
        <Typography>No applications yet.</Typography>
      ) : (
        applications.map((app, index) => (
          <Paper key={index} sx={{ marginBottom: "1rem", padding: "1rem", width: "80%" }}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>{app.applicantName} applied for {app.jobTitle}</Typography>
                <Typography>Email: {app.applicantEmail}</Typography>
                <Typography>Phone: {app.applicantPhone}</Typography>
                <Typography>Address: {app.applicantAddress}</Typography>
                {app.applicantLinkedIn && <Typography>LinkedIn: {app.applicantLinkedIn}</Typography>}
                <Typography sx={{ marginTop: "1rem" }}>Cover Letter: {app.applicantCoverLetter}</Typography>
              </CardContent>
            </Card>
          </Paper>
        ))
      )}
    </Box>
    </div>
  );
}

export default Dashboard;
