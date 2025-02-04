import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Paper, Typography, Box, Stack } from "@mui/material";

function Login() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((u) => u.email === credentials.email && u.password === credentials.password);
    if (user) {
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      alert("Login successful!");
      navigate("/home");
    } else {
      alert("Invalid email or password!");
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Paper sx={{ padding: 4, width: 400 }}>
        <Typography variant="h4" gutterBottom textAlign="center">
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField label="Email" name="email" value={credentials.email} onChange={handleChange} required />
            <TextField label="Password" name="password" type="password" value={credentials.password} onChange={handleChange} required />
            <Button type="submit" variant="contained">Login</Button>
            <Button variant="outlined" onClick={() => navigate("/register")}>Create Account</Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}
export default Login;
