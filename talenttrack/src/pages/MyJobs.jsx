// src/pages/MyJobs.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Paper,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function MyJobs() {
  const [jobs, setJobs] = useState([]);
  // Keep track of which job is currently being edited
  const [editingJobId, setEditingJobId] = useState(null);

  // Temporary state to hold edit form data
  const [editFormData, setEditFormData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    about: "",
  });

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
      setJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  const handleEdit = (job) => {
    // Set the job that we are editing
    setEditingJobId(job.id);
    // Load its current data into our edit form state
    setEditFormData({
      title: job.title,
      company: job.company,
      location: job.location,
      salary: job.salary,
      about: job.about ?? "",
    });
  };

  const handleEditChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value,
    });
  };

  // Save the changes (PUT request to update job in JSON Server)
  const handleEditSubmit = async (jobId) => {
    try {
      await axios.put(`http://localhost:3001/jobs/${jobId}`, {
        ...jobs.find((j) => j.id === jobId),
        ...editFormData,
      });

      // Update jobs in state
      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job.id === jobId ? { ...job, ...editFormData } : job
        )
      );

      // Clear editing state
      setEditingJobId(null);
    } catch (error) {
      console.error("Error updating job:", error);
    }
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingJobId(null);
  };

  return (
    <>
      <Navbar />
      <Box
        sx={{ display: "flex", justifyContent: "center", padding: "2rem", width: "95vw" }}
      >
        <Paper sx={{ padding: 4, maxWidth: 800, width: "100%" }}>
          <Typography variant="h4" textAlign="center" sx={{ marginBottom: "1rem" }}>
            My Posted Jobs
          </Typography>
          {jobs.length > 0 ? (
            jobs.map((job) => {
              const isEditing = editingJobId === job.id;
              return (
                <Card key={job.id} variant="outlined" sx={{ marginBottom: "1rem" }}>
                  <CardContent>
                    {isEditing ? (
                      // If this job is being edited, show text fields
                      <>
                        <TextField
                          name="title"
                          label="Title"
                          value={editFormData.title}
                          onChange={handleEditChange}
                          fullWidth
                          sx={{ mb: 1 }}
                        />
                        <TextField
                          name="company"
                          label="Company"
                          value={editFormData.company}
                          onChange={handleEditChange}
                          fullWidth
                          sx={{ mb: 1 }}
                        />
                        <TextField
                          name="location"
                          label="Location"
                          value={editFormData.location}
                          onChange={handleEditChange}
                          fullWidth
                          sx={{ mb: 1 }}
                        />
                        <TextField
                          name="salary"
                          label="Salary"
                          value={editFormData.salary}
                          onChange={handleEditChange}
                          fullWidth
                          sx={{ mb: 1 }}
                        />
                        <TextField
                          name="about"
                          label="About"
                          value={editFormData.about}
                          onChange={handleEditChange}
                          fullWidth
                          multiline
                          rows={3}
                          sx={{ mb: 1 }}
                        />

                        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleEditSubmit(job.id)}
                          >
                            Save
                          </Button>
                          <Button variant="outlined" onClick={handleCancelEdit}>
                            Cancel
                          </Button>
                        </Box>
                      </>
                    ) : (
                      // Otherwise, just show the job details
                      <>
                        <Typography variant="h5">{job.title}</Typography>
                        <Typography color="textSecondary">{job.company}</Typography>
                        <Typography color="textSecondary">{job.location}</Typography>
                        {job.salary && (
                          <Typography color="textSecondary">Salary: {job.salary}</Typography>
                        )}
                        {job.about && (
                          <Typography color="textSecondary">About: {job.about}</Typography>
                        )}

                        <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleEdit(job)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => handleDelete(job.id)}
                          >
                            Delete
                          </Button>
                        </Box>
                      </>
                    )}
                  </CardContent>
                </Card>
              );
            })
          ) : (
            <Typography textAlign="center">No jobs posted yet.</Typography>
          )}
        </Paper>
      </Box>
    </>
  );
}

export default MyJobs;
