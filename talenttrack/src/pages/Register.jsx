import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Paper, Typography, Stack, TextField, Button } from "@mui/material";

function Register() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     
      const res = await axios.get(`http://localhost:3001/users?email=${user.email}`);
      if (res.data.length > 0) {
        alert("User already exists! Please log in.");
      } else {
        await axios.post("http://localhost:3001/users", user);
        alert("Registration successful!");
        navigate("/");
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("An error occurred during registration.");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      width="100vw"
      sx={{ backgroundColor: "#ffffff" }}
    >
      <Paper sx={{ padding: 4, width: 400 }}>
        <Typography variant="h4" gutterBottom textAlign="center">
          Register
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField label="Name" name="name" value={user.name} onChange={handleChange} required />
            <TextField label="Email" name="email" value={user.email} onChange={handleChange} required />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={user.password}
              onChange={handleChange}
              required
            />
            <Button type="submit" variant="contained" fullWidth>
              Create Account
            </Button>
            <Button variant="outlined" onClick={() => navigate("/")} fullWidth>
              Back
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}

export default Register;
