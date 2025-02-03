import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TextField, Button, Typography, Card, CardContent } from "@mui/material";

function Apply() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    resume: "",
    coverLetter: ""
  });

  useEffect(() => {
    fetch("/jobs.json")
      .then((response) => response.json())
      .then((data) => {
        const selectedJob = data.find((job) => job.id === parseInt(id));
        setJob(selectedJob);
      })
      .catch((error) => console.error("Error loading job details:", error));
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Application Submitted:", formData);
    alert("Application submitted successfully!");
    setFormData({
      name: "",
      email: "",
      phone: "",
      resume: "",
      coverLetter: ""
    });
  };

  if (!job) {
    return <Typography>Loading job details...</Typography>;
  }

  return (
    <div style={{ padding: "2rem", display: "flex", justifyContent: "center" }}>
      <Card variant="outlined" sx={{ maxWidth: 600, padding: 3 }}>
        <CardContent>
          <Typography variant="h5">{job.title}</Typography>
          <Typography color="textSecondary">{job.company}</Typography>
          <Typography color="textSecondary">{job.location}</Typography>
          <Typography variant="body1" sx={{ marginTop: 2 }}>
            <strong>Salary:</strong> {job.salary}
          </Typography>

          <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
            <TextField
              fullWidth
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              margin="normal"
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              margin="normal"
            />
            <TextField
              fullWidth
              label="Phone Number"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              required
              margin="normal"
            />
            <TextField
              fullWidth
              label="Resume (Link to Drive or PDF)"
              name="resume"
              value={formData.resume}
              onChange={handleChange}
              required
              margin="normal"
            />
            <TextField
              fullWidth
              label="Cover Letter"
              name="coverLetter"
              multiline
              rows={4}
              value={formData.coverLetter}
              onChange={handleChange}
              required
              margin="normal"
            />
            <Button variant="contained" color="primary" type="submit" sx={{ marginTop: 2 }}>
              Submit Application
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Apply;
