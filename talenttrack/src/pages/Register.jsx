import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Paper, Typography, Box, Stack } from "@mui/material";

function Register() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.some((u) => u.email === user.email)) {
      alert("User already exists! Please log in.");
    } else {
      localStorage.setItem("users", JSON.stringify([...users, user]));
      alert("Registration successful!");
      navigate("/");
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Paper sx={{ padding: 4, width: 400 }}>
        <Typography variant="h4" gutterBottom textAlign="center">
          Register
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField label="Name" name="name" value={user.name} onChange={handleChange} required />
            <TextField label="Email" name="email" value={user.email} onChange={handleChange} required />
            <TextField label="Password" name="password" type="password" value={user.password} onChange={handleChange} required />
            <Button type="submit" variant="contained">Create Account</Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}
export default Register;