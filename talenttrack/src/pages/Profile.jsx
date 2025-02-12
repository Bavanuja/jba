import { useState, useEffect } from "react";
import { Container, Typography, Avatar, TextField, Button, Paper, Box, IconButton } from "@mui/material";

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

  
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

 
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser((prevUser) => ({ ...prevUser, profilePic: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  
  const handleSave = () => {
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    setIsEditing(false);
  };

  return (
    <>
      <Navbar />
      <Box display="flex" 
      justifyContent="center" 
      alignItems="center" 
      minHeight="100vh"
      width="100vw" 
      sx={{
        backgroundColor: "#ffffff",
        display: "flex"
      }}>
        <Container maxWidth="sm">
          <Paper elevation={3} sx={{ padding: 4, textAlign: "center", borderRadius: 3 }}>
            
            
            <Box position="relative" display="inline-block">
              <Avatar src={user.profilePic} alt={user.name} sx={{ width: 120, height: 120, margin: "auto" }} />
              {isEditing && (
                <>
                  <input
                    accept="image/*"
                    type="file"
                    id="profile-pic-upload"
                    style={{ display: "none" }}
                    onChange={handleProfilePicChange}
                  />
                  <label htmlFor="profile-pic-upload">
                    <IconButton
                      color="primary"
                      component="span"
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        backgroundColor: "white",
                        boxShadow: 1,
                      }}
                    >
                      
                    </IconButton>
                  </label>
                </>
              )}
            </Box>

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
      </Box>
    </>
  );
}

export default Profile;
