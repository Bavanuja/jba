import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Paper, Typography, Box, Stack } from "@mui/material";

function Login() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setCredentials({ ...credentials, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const res = await axios.get(
        `http://localhost:3001/users?email=${credentials.email}&password=${credentials.password}`
      );
      if (res.data.length > 0) {
        const user = res.data[0];
       
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        alert("Login successful!");
        navigate("/home");
      } else {
        alert("Invalid email or password!");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login.");
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
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          width: "100%",
          maxWidth: 400,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" gutterBottom textAlign="center">
          Login
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <Stack spacing={2}>
            <TextField
              label="Email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={credentials.password}
              onChange={handleChange}
              required
              fullWidth
            />
            <Button type="submit" variant="contained" fullWidth>
              Login
            </Button>
            <Button variant="outlined" onClick={() => navigate("/register")} fullWidth>
              Create Account
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}

export default Login;
