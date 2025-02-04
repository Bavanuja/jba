import { useState } from "react";
import { AppBar, Toolbar, Typography, Avatar, Menu, MenuItem, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user")) || {
    name: "Guest User",
    profilePic: "/default-avatar.png",
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <AppBar position="static" sx={{ backgroundColor: "#1976D2", paddingX: 2 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        
        {/* Left Side: App Name */}
        <Typography variant="h6" sx={{ fontWeight: "bold", cursor: "pointer" }}>
          TalentTrack
        </Typography>

        {/* Right Side: Navigation Buttons and Profile Avatar */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Button color="inherit" onClick={() => navigate("/home")}>Home</Button>
          <Button color="inherit" onClick={() => navigate("/dashboard")}>Dashboard</Button>
          <Button color="inherit" onClick={() => navigate("/")}>Logout</Button>

          {/* Avatar */}
          <Avatar 
            alt="User" 
            src={storedUser.profilePic} 
            sx={{ cursor: "pointer" }} 
            onClick={handleMenuOpen} 
          />
          
          {/* Profile Menu */}
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            <MenuItem onClick={() => { navigate("/profile"); handleMenuClose(); }}>
              View Profile
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
