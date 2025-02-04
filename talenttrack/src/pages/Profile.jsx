import { useState, useEffect } from "react";
import { Container, Typography, Avatar, TextField, Button, Paper, Box } from "@mui/material";
import Navbar from "./Navbar";

function Profile() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("loggedInUser")) || {
      name: "Your Name",
      email: "Your Email",
      profilePic: "/default-avatar.png",
      location: "Your Location",
      bio: "Write about yourself",
    }
  );
  const [isEditing, setIsEditing] = useState(false);

  // Update state if user logs in again
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Save updated profile data
  const handleSave = () => {
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    setIsEditing(false);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Navbar />
      <Paper elevation={3} sx={{ padding: 3, textAlign: "center", borderRadius: 3 }}>
        <Avatar src={user.profilePic} alt={user.name} sx={{ width: 100, height: 100, margin: "auto" }} />

        <Box sx={{ mt: 3 }}>
          {isEditing ? (
            <>
              <TextField fullWidth label="Name" name="name" value={user.name} onChange={handleChange} sx={{ mb: 2 }} />
              <TextField fullWidth label="Email" name="email" value={user.email} onChange={handleChange} sx={{ mb: 2 }} />
              <TextField fullWidth label="Location" name="location" value={user.location} onChange={handleChange} sx={{ mb: 2 }} />
              <TextField fullWidth label="Bio" name="bio" multiline rows={3} value={user.bio} onChange={handleChange} sx={{ mb: 2 }} />
              <Button variant="contained" color="success" onClick={handleSave} sx={{ mr: 2 }}>
                Save
              </Button>
              <Button variant="outlined" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>{user.name}</Typography>
              <Typography color="textSecondary">{user.email}</Typography>
              <Typography color="textSecondary">{user.location}</Typography>
              <Typography sx={{ mt: 2 }}>{user.bio}</Typography>
              <Button variant="contained" sx={{ mt: 2 }} onClick={() => setIsEditing(true)}>
                Edit Profile
              </Button>
            </>
          )}
        </Box>
      </Paper>
    </Container>
  );
}

export default Profile;
