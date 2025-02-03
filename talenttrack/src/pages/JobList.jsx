import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Paper,
  Stack
} from "@mui/material";

function JobList() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch("/jobs.json")
      .then((response) => response.json())
      .then((data) => setJobs(data))
      .catch((error) => console.error("Error loading jobs:", error));
  }, []);

  return (
    <Box sx={{ padding: "2rem", display: "flex", justifyContent: "center",width: "100vw"}}>
      <Paper sx={{ padding: "2rem", maxWidth: "800px", width: "100%" }}>
        <Typography variant="h4" gutterBottom sx={{ textAlign: "center", fontWeight: "bold", color: "#333" }}>
          Job Listings
        </Typography>
        
        {/* Column-based layout using Stack */}
        <Stack spacing={3}>
          {jobs.map((job) => (
            <Card
              key={job.id}
              sx={{
                padding: 2,
                boxShadow: 3,
                transition: "0.3s",
                "&:hover": { transform: "scale(1.02)", boxShadow: 6 },
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#1976D2" }}>
                  {job.title}
                </Typography>
                <Typography color="textSecondary">{job.company}</Typography>
                <Typography color="textSecondary">{job.location}</Typography>
                <Typography variant="body2" sx={{ color: "gray", marginTop: 1 }}>
                  Posted on: {job.created_at}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ marginTop: 2, width: "100%" }}
                  component={Link}
                  to={`/job/${job.id}`}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Paper>
    </Box>
  );
}

export default JobList;
