import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, Typography, TextField, Button, Box, Paper } from "@mui/material";

function Apply() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    linkedIn: "",
    coverLetter: "",
    resume: null, // Resume file
  });

  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem("jobs")) || [];
    const selectedJob = storedJobs.find((job) => job.id === parseInt(id));
    setJob(selectedJob);
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, resume: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!formData.resume) {
      alert("Please upload your resume.");
      return;
    }
  
    const storedApplications = JSON.parse(localStorage.getItem("applications")) || [];
    
    const newApplication = {
      jobId: job.id,
      jobTitle: job.title,
      applicantName: formData.name,
      applicantEmail: formData.email,
      applicantPhone: formData.phone,
      applicantAddress: formData.address,
      applicantLinkedIn: formData.linkedIn,
      applicantCoverLetter: formData.coverLetter,
      jobPosterId: job.postedBy, // ID of the user who posted the job
    };
  
    storedApplications.push(newApplication);
    localStorage.setItem("applications", JSON.stringify(storedApplications));
  
    alert("Application submitted successfully!");
    navigate("/joblist"); // Redirect to home page
  };
  

  if (!job) {
    return <Typography textAlign="center" sx={{ marginTop: "2rem" }}>Loading job details...</Typography>;
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center", padding: "2rem", width: "100vw" }}>
      <Paper sx={{ padding: 4, maxWidth: 600, width: "100%" }}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h5" sx={{ fontWeight: "bold", color: "#1976D2" }}>
              Apply for {job.title}
            </Typography>
            <Typography color="textSecondary" sx={{ fontSize: "1.1rem", marginTop: 1 }}>
              {job.company}
            </Typography>
            <form onSubmit={handleSubmit} style={{ marginTop: "2rem" }}>
              <TextField
                label="Full Name"
                variant="outlined"
                fullWidth
                name="name"
                value={formData.name}
                onChange={handleChange}
                sx={{ marginBottom: "1rem" }}
                required
              />
              <TextField
                label="Email Address"
                variant="outlined"
                fullWidth
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                sx={{ marginBottom: "1rem" }}
                required
              />
              <TextField
                label="Phone Number"
                variant="outlined"
                fullWidth
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                sx={{ marginBottom: "1rem" }}
                required
              />
              <TextField
                label="Address"
                variant="outlined"
                fullWidth
                name="address"
                value={formData.address}
                onChange={handleChange}
                sx={{ marginBottom: "1rem" }}
                required
              />
              <TextField
                label="LinkedIn Profile (Optional)"
                variant="outlined"
                fullWidth
                name="linkedIn"
                value={formData.linkedIn}
                onChange={handleChange}
                sx={{ marginBottom: "1rem" }}
              />
              <TextField
                label="Cover Letter"
                variant="outlined"
                fullWidth
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleChange}
                sx={{ marginBottom: "1rem" }}
                multiline
                rows={4}
                required
              />
              <Typography sx={{ marginBottom: "0.5rem" }}>Upload Resume (PDF Only):</Typography>
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                required
                style={{ marginBottom: "1rem", display: "block" }}
              />
              <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 3 }}>
                <Button variant="contained" color="success" type="submit">
                  Submit Application
                </Button>
                <Button variant="outlined" onClick={() => navigate(-1)}>
                  Back to Job Details
                </Button>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Paper>
    </Box>
  );
}

export default Apply;
